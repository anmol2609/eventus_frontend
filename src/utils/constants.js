export const CONSTANTS = {
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  },
  CUSTOMER_TYPE: {
    ORGANIZATION: 'Organization',
    PARTNER: 'Partner',
  },
  TENANCY_LEVEL: {
    L0: 'L0',
    L1: 'L1',
    L2: 'L2',
    L3: 'L3',
  },
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  URL_REGEX: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
  FEED_ENTRY_RESPONSE: {
    APPROVE: 'approve',
    REJECT: 'reject',
    DUPLICATE: 'duplicate',
  },
  SEVERITY_LEVELS: {
    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
  },
  ARTIFACTS_STATUS: {
    WHITELIST: 'whitelist',
    BLACKLIST: 'blacklist',
    OBSERVATION: 'observation',
  },
  DEFAULT_VALUES: {
    CUSTOMER_DETAILS: {
      AWS: {
        PRODUCT_NAME: 'AWS',
        PRODUCT_TYPE: 'Customer',
        PRODUCT_MODULE: 'Mod1',
      },
      O365: {
        PRODUCT_NAME: 'O365',
        PRODUCT_TYPE: 'Customer',
        PRODUCT_MODULE: 'Mod2',
      },
      V1: {
        PRODUCT_NAME: 'V1',
        PRODUCT_TYPE: 'Customer',
        PRODUCT_MODULE: 'Mod3',
      },
    },
    LOGGER_PRODUCTS: {
      QUEUE_SIZE: 250000,
      MAX_DISK_SPACE: '5g',
      WORKER_THREADS: 2,
      FILENAME: 'relp_buffer_',
    },
  },
  HOSTS: {
    MANAGEMENT: 'http://127.0.0.1:5000',
    TI: 'http://127.0.0.1:4000',
    ML_MODEL: 'http://127.0.0.1:5001',
  },
  USER_TYPE: {
    LOCAL: 'LOCAL',
    IDP: 'IDP',
  },
}
