export default function ConfigFile(logger_customer, logger_type) {
  let customer = logger_customer.customer
  let products = logger_customer.product_details

  function generateCondition(keywords, isFirstCondition = true) {
    if (keywords.length === 1) {
      return `${isFirstCondition ? 'if ' : 'else if '}($msg contains "${keywords[0].keyword}") then `
    }

    let result = isFirstCondition ? 'if (' : 'else if ('
    let currentCondition = keywords[0].condition
    let group = []
    let isFirstGroup = true

    for (let i = 0; i < keywords.length; i++) {
      const item = keywords[i]
      group.push(`$msg contains "${item.keyword}"`)

      if (i === keywords.length - 1 || keywords[i + 1].condition !== currentCondition) {
        if (isFirstGroup) {
          if (keywords[i + 1]) {
            group.push(`$msg contains "${keywords[i + 1].keyword}"`)
          }
          result += `(${group.join(` ${currentCondition} `)})`
          isFirstGroup = false
        } else {
          if (
            keywords[i + 1] &&
            keywords[i - 1] &&
            keywords[i + 1].condition === keywords[i - 1].condition
          ) {
            result += ` ${currentCondition} `
          } else result += `(${group.join(` ${currentCondition} `)})`
        }

        if (i < keywords.length - 1) {
          currentCondition = keywords[i + 1].condition
        }
        group = []
      }
    }

    result += ') then '
    return result
  }

  return `
      # Eventus Security Data Lake Logger Configuration for on premises

      module(
        load="impstats"
        interval="10"             # how often to generate stats
        resetCounters="off"        # to get deltas (e.g. # of messages submitted in the last 10 seconds)
        log.file="/tmp/stats"     # file to write those stats to
        log.syslog="off"          # don't send stats through the normal processing pipeline. More on that in a bit
      )

      # /etc/rsyslog.conf configuration file for rsyslog
      #
      # For more information install rsyslog-doc and see
      # /usr/share/doc/rsyslog-doc/html/configuration/index.html
      #
      # Default logging rules can be found in /etc/rsyslog.d/50-default.conf

      #################
      #### MODULES ####
      #################

      module(load="imuxsock") # provides support for local system logging
      module(load="imudp")  # Allocate for imudp
      input(type="imudp" port="9002")

      module(load="imtcp")  # Allocate for imtcp
      input(type="imtcp" port="9001")

      module(load="imklog" permitnonkernelfacility="off") # provides kernel logging support and enables non-kernel klog messages
      module(load="omrelp" tls.tlslib="openssl")  # Load omrelp with OpenSSL TLS support

      #$MainMsgQueueFileName disk-assisted
      $MaxMessageSize 128k
      #$MainMsgQueueWorkerThreads 8

      ###########################
      #### GLOBAL DIRECTIVES ####
      ###########################

      $ActionFileDefaultTemplate RSYSLOG_TraditionalFileFormat
      $RepeatedMsgReduction on

      $FileOwner syslog
      $FileGroup adm
      $FileCreateMode 0640
      $DirCreateMode 0755
      $Umask 0022
      $PrivDropToUser syslog
      $PrivDropToGroup syslog

      $WorkDirectory /var/spool/rsyslog
      $IncludeConfig /etc/rsyslog.d/*.conf

      ###############
      #### RULES ####
      ###############

      #auth,authpriv.*                 /var/log/auth.log
      *.*;auth,authpriv.none          -/var/log/esdl.log
      #daemon.*                        -/var/log/daemon.log
      #kern.*                          -/var/log/kern.log
      #lpr.*                           -/var/log/lpr.log
      #mail.*                          -/var/log/mail.log
      #user.*                          -/var/log/user.log

      #mail.info                       -/var/log/mail.info
      #mail.warn                       -/var/log/mail.warn
      #mail.err                        /var/log/mail.err

      #*.=debug;\
            #  auth,authpriv.none;\
           #   mail.none               -/var/log/debug
      #*.=info;*.=notice;*.=warn;\
             # auth,authpriv.none;\
            #  cron,daemon.none;\
           #   mail.none               -/var/log/messages

      *.emerg                         :omusrmsg:*

      # Set gtls driver
      $DefaultNetstreamDriver gtls

      ${
        products &&
        products
          .map(
            (product) =>
              `template(name="${product.template_name}" type="list") {
                  constant(value="{\"full_log\":\"")
                  property(name="msg" format="json")
                  constant(value="\",\"tenant\":\"${customer.name}\",\"productName\":\"${product.product_name}\",\"productType\":\"${product.product_type}\",\"logType\":\"${product.log_type}\",\"cust1\":\"${logger_type}\",\"L0\":\"${logger_customer.customer_l0_tenancy_partner_tenant_uuid}\",\"L1\":\"${logger_customer.customer_l1_tenancy_partner_tenant_uuid}\",\"L2\":\"${logger_customer.customer_l2_tenancy_partner_tenant_uuid}\",\"L3\":\"${logger_customer.customer_tenant_uuid}\"")
                  constant(value="}\n")
              }`,
          )
          .join('\n')
      }

      template(name="NoTemplate" type="list") {
          constant(value="{\"full_log\":\"")
          property(name="msg" format="json")
          constant(value="\",\"tenant\":\"${customer.name}\",\"logType\":\"other\",\"cust1\":\"${logger_type}\",\"L0\":\"${logger_customer.customer_l0_tenancy_partner_tenant_uuid}\",\"L1\":\"${logger_customer.customer_l1_tenancy_partner_tenant_uuid}\",\"L2\":\"${logger_customer.customer_l2_tenancy_partner_tenant_uuid}\",\"L3\":\"${
            logger_customer.customer_tenant_uuid
          }\"")
          constant(value="}\n")
      }

      template(name="ErrorTemplate" type="list") {
          constant(value="{\"full_log\":\"")
          property(name="msg" format="json")
          constant(value="\",\"tenant\":\"${customer.name}\",\"logType\":\"error\",\"cust1\":\"${logger_type}\",\"L0\":\"${logger_customer.customer_l0_tenancy_partner_tenant_uuid}\",\"L1\":\"${logger_customer.customer_l1_tenancy_partner_tenant_uuid}\",\"L2\":\"${logger_customer.customer_l2_tenancy_partner_tenant_uuid}\",\"L3\":\"${logger_customer.customer_tenant_uuid}\"")
          constant(value="}\n")
      }

      #################
      #### ACTIONS ####
      #################

      ${
        products &&
        products
          .map(
            (product, index) => `
          ${generateCondition(product.keywords, index === 0)}{
            action(
                    type="omrelp"
                    target="${logger_customer.target}"  #change
                    port="20515"
                    timeout="5"
                    conn.timeout="3"
                    tls="on"
                    template="${product.template_name}"  #change
                    tls.cacert="/etc/ssl/rsyslog/CA.pem"
                    tls.mycert="/etc/ssl/rsyslog/client-cert.pem"
                    tls.myprivkey="/etc/ssl/rsyslog/client-key.pem"
                    tls.authmode="certvalid"
                    tls.permittedpeer="eventus"
                    queue.type="LinkedList"
                    queue.filename="${product.filename}" #change
                    queue.size="${product.queue_size}"             #change
                    queue.maxdiskspace="${product.max_disk_space}"         #change
                    queue.saveonshutdown="on"
                    queue.dequeuebatchsize="4096"
                    queue.workerthreads="${product.worker_threads}"         #change
                    queue.workerThreadMinimumMessages="25000"
                    queue.spoolDirectory="/var/spool/rsyslog"
                    action.resumeRetryCount="-1"
                    action.resumeInterval="1"
                    queue.highWatermark="225000"
                    queue.lowWatermark="175000"
            )
    }
        `,
          )
          .join('\n')
      }

      else if $msg contains "www.rsyslog.com" then {
              action(
                      type="omrelp"
                      target="172.16.11.100"
                      port="20515"
                      timeout="5"
                      conn.timeout="3"
                      tls="on"
                      template="ErrorTemplate"
                      tls.cacert="/etc/ssl/rsyslog/CA.pem"
                      tls.mycert="/etc/ssl/rsyslog/client-cert.pem"
                      tls.myprivkey="/etc/ssl/rsyslog/client-key.pem"
                      tls.authmode="certvalid"
                      tls.permittedpeer="eventus"
                      queue.type="LinkedList"
                      queue.filename="relp_buffer_error"
                      queue.size="250000"
                      queue.maxdiskspace="5g"
                      queue.saveonshutdown="on"
                      queue.dequeuebatchsize="4096"
                      queue.workerthreads="2"
                      queue.workerThreadMinimumMessages="25000"
                      queue.spoolDirectory="/var/spool/rsyslog"
                      action.resumeRetryCount="-1"
                      action.resumeInterval="1"
                      queue.highWatermark="225000"
                      queue.lowWatermark="175000"
              )
      }

      else {
              action(
                      type="omrelp"
                      target="172.16.11.100"
                      port="20515"
                      timeout="5"
                      conn.timeout="3"
                      tls="on"
                      template="NoTemplate"
                      tls.cacert="/etc/ssl/rsyslog/CA.pem"
                      tls.mycert="/etc/ssl/rsyslog/client-cert.pem"
                      tls.myprivkey="/etc/ssl/rsyslog/client-key.pem"
                      tls.authmode="certvalid"
                      tls.permittedpeer="eventus"
                      queue.type="LinkedList"
                      queue.filename="relp_buffer_other"
                      queue.size="250000"
                      queue.maxdiskspace="5g"
                      queue.saveonshutdown="on"
                      queue.dequeuebatchsize="4096"
                      queue.workerthreads="2"
                      queue.workerThreadMinimumMessages="25000"
                      queue.spoolDirectory="/var/spool/rsyslog"
                      action.resumeRetryCount="-1"
                      action.resumeInterval="1"
                      queue.highWatermark="225000"
                      queue.lowWatermark="175000"
              )
      }
      # Completed our ESDL Logger Configuration
      `
}
