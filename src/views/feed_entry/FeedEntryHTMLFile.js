export default function FeedEntryHTMLFile(
  summary,
  title,
  feedLink,
  threatType,
  severityLevel,
  targetedSector,
  targetedRegion,
  threatActorType,
  threatActorRegion,
  mitres,
  tags,
) {
  const date = new Date()
  return `
  <!DOCTYPE html>
  <html
     xmlns:v="urn:schemas-microsoft-com:vml"
     xmlns:o="urn:schemas-microsoft-com:office:office"
     xmlns:w="urn:schemas-microsoft-com:office:word"
     xmlns:x="urn:schemas-microsoft-com:office:excel"
     xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
     xmlns="http://www.w3.org/TR/REC-html40"
     >
     <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />
        <meta name="ProgId" content="Word.Document" />
        <meta name="Generator" content="Microsoft Word 15" />
        <meta name="Originator" content="Microsoft Word 15" />
        <link
           rel="File-List"
           href="Coolclient,%20Quickheal%20and%20Rainyday%20Backdoor_files/filelist.xml"
           />
        <link
           rel="Edit-Time-Data"
           href="Coolclient,%20Quickheal%20and%20Rainyday%20Backdoor_files/editdata.mso"
           />
        <link
           rel="themeData"
           href="Coolclient,%20Quickheal%20and%20Rainyday%20Backdoor_files/themedata.thmx"
           />
        <link
           rel="colorSchemeMapping"
           href="Coolclient,%20Quickheal%20and%20Rainyday%20Backdoor_files/colorschememapping.xml"
           />
        <style>
           <!--
              /* Font Definitions */
              @font-face
              {font-family:"Cambria Math";
              panose-1:2 4 5 3 5 4 6 3 2 4;
              mso-font-charset:0;
              mso-generic-font-family:roman;
              mso-font-pitch:variable;
              mso-font-signature:-536869121 1107305727 33554432 0 415 0;}
              @font-face
              {font-family:Calibri;
              panose-1:2 15 5 2 2 2 4 3 2 4;
              mso-font-charset:0;
              mso-generic-font-family:swiss;
              mso-font-pitch:variable;
              mso-font-signature:-469750017 -1073732485 9 0 511 0;}
              @font-face
              {font-family:Aptos;
              mso-font-charset:0;
              mso-generic-font-family:swiss;
              mso-font-pitch:variable;
              mso-font-signature:536871559 3 0 0 415 0;}
              @font-face
              {font-family:Montserrat;
              mso-font-charset:0;
              mso-generic-font-family:auto;
              mso-font-pitch:variable;
              mso-font-signature:536871439 3 0 0 407 0;}
              /* Style Definitions */
              p.MsoNormal, li.MsoNormal, div.MsoNormal
              {mso-style-unhide:no;
              mso-style-qformat:yes;
              mso-style-parent:"";
              margin:0in;
              mso-pagination:widow-orphan;
              font-size:11.0pt;
              font-family:"Calibri",sans-serif;
              mso-fareast-font-family:Aptos;
              mso-fareast-theme-font:minor-latin;}
              a:link, span.MsoHyperlink
              {mso-style-noshow:yes;
              mso-style-priority:99;
              color:#467886;
              mso-themecolor:hyperlink;
              text-decoration:underline;
              text-underline:single;}
              a:visited, span.MsoHyperlinkFollowed
              {mso-style-noshow:yes;
              mso-style-priority:99;
              color:#96607D;
              mso-themecolor:followedhyperlink;
              text-decoration:underline;
              text-underline:single;}
              p
              {mso-style-noshow:yes;
              mso-style-priority:99;
              mso-margin-top-alt:auto;
              margin-right:0in;
              mso-margin-bottom-alt:auto;
              margin-left:0in;
              mso-pagination:widow-orphan;
              font-size:12.0pt;
              font-family:"Aptos",sans-serif;
              mso-fareast-font-family:Aptos;
              mso-fareast-theme-font:minor-latin;
              mso-bidi-font-family:Aptos;}
              span.EmailStyle17
              {mso-style-type:personal-compose;
              mso-style-noshow:yes;
              mso-style-unhide:no;
              mso-ansi-font-size:11.0pt;
              mso-bidi-font-size:11.0pt;
              font-family:"Aptos",sans-serif;
              mso-ascii-font-family:Aptos;
              mso-ascii-theme-font:minor-latin;
              mso-fareast-font-family:Aptos;
              mso-fareast-theme-font:minor-latin;
              mso-hansi-font-family:Aptos;
              mso-hansi-theme-font:minor-latin;
              mso-bidi-font-family:"Times New Roman";
              mso-bidi-theme-font:minor-bidi;
              color:windowtext;}
              p.xxmsonormal, li.xxmsonormal, div.xxmsonormal
              {mso-style-name:xxmsonormal;
              mso-style-priority:99;
              mso-style-unhide:no;
              mso-margin-top-alt:auto;
              margin-right:0in;
              mso-margin-bottom-alt:auto;
              margin-left:0in;
              mso-pagination:widow-orphan;
              font-size:11.0pt;
              font-family:"Calibri",sans-serif;
              mso-fareast-font-family:Aptos;
              mso-fareast-theme-font:minor-latin;}
              p.xxxmsonormal, li.xxxmsonormal, div.xxxmsonormal
              {mso-style-name:xxxmsonormal;
              mso-style-priority:99;
              mso-style-unhide:no;
              mso-margin-top-alt:auto;
              margin-right:0in;
              mso-margin-bottom-alt:auto;
              margin-left:0in;
              mso-pagination:widow-orphan;
              font-size:11.0pt;
              font-family:"Calibri",sans-serif;
              mso-fareast-font-family:Aptos;
              mso-fareast-theme-font:minor-latin;}
              p.xxxxxxxmsonormal, li.xxxxxxxmsonormal, div.xxxxxxxmsonormal
              {mso-style-name:xxxxxxxmsonormal;
              mso-style-priority:99;
              mso-style-unhide:no;
              mso-margin-top-alt:auto;
              margin-right:0in;
              mso-margin-bottom-alt:auto;
              margin-left:0in;
              mso-pagination:widow-orphan;
              font-size:11.0pt;
              font-family:"Calibri",sans-serif;
              mso-fareast-font-family:Aptos;
              mso-fareast-theme-font:minor-latin;}
              span.SpellE
              {mso-style-name:"";
              mso-spl-e:yes;}
              .MsoChpDefault
              {mso-style-type:export-only;
              mso-default-props:yes;
              font-size:11.0pt;
              mso-ansi-font-size:11.0pt;
              mso-bidi-font-size:11.0pt;
              mso-ascii-font-family:Aptos;
              mso-ascii-theme-font:minor-latin;
              mso-fareast-font-family:Aptos;
              mso-fareast-theme-font:minor-latin;
              mso-hansi-font-family:Aptos;
              mso-hansi-theme-font:minor-latin;
              mso-bidi-font-family:"Times New Roman";
              mso-bidi-theme-font:minor-bidi;}
              @page WordSection1
              {size:8.5in 11.0in;
              margin:1.0in 1.0in 1.0in 1.0in;
              mso-header-margin:.5in;
              mso-footer-margin:.5in;
              mso-paper-source:0;}
              div.WordSection1
              {page:WordSection1;}
              -->
        </style>
        <!--[if gte mso 10]>
        <style>
           /* Style Definitions */
           table.MsoNormalTable {
           mso-style-name: "Table Normal";
           mso-tstyle-rowband-size: 0;
           mso-tstyle-colband-size: 0;
           mso-style-noshow: yes;
           mso-style-priority: 99;
           mso-style-parent: "";
           mso-padding-alt: 0in 5.4pt 0in 5.4pt;
           mso-para-margin: 0in;
           mso-pagination: widow-orphan;
           font-size: 11pt;
           font-family: "Aptos", sans-serif;
           mso-ascii-font-family: Aptos;
           mso-ascii-theme-font: minor-latin;
           mso-hansi-font-family: Aptos;
           mso-hansi-theme-font: minor-latin;
           mso-font-kerning: 1pt;
           mso-ligatures: standardcontextual;
           }
        </style>
        <![endif]-->
     </head>
     <body
        lang="EN-US"
        link="#467886"
        vlink="#96607D"
        style="tab-interval: 0.5in; word-wrap: break-word"
        >
        <div class="WordSection1">
           <p class="xxmsonormal" style="margin: 0in; background: white">
              <span
                 lang="EN-IN"
                 style="
                 color: #242424;
                 border: none windowtext 1pt;
                 mso-border-alt: none windowtext 0in;
                 padding: 0in;
                 mso-ansi-language: EN-IN;
                 "
                 >Hi</span
                 ><span lang="EN-IN" style="color: black; mso-ansi-language: EN-IN">
              COMPANYNAME </span
                 ><span
                 lang="EN-IN"
                 style="
                 color: #242424;
                 border: none windowtext 1pt;
                 mso-border-alt: none windowtext 0in;
                 padding: 0in;
                 mso-ansi-language: EN-IN;
                 "
                 >Team, </span
                 >
              <span lang="EN-IN" style="mso-ansi-language: EN-IN">
                 <o:p></o:p>
              </span>
           </p>
           <p
              class="xxxmsonormal"
              style="
              margin: 0in;
              background: white;
              font-variant-ligatures: normal;
              font-variant-caps: normal;
              orphans: 2;
              text-align: start;
              widows: 2;
              text-decoration-style: initial;
              text-decoration-color: initial;
              background-image: initial;
              background-position: initial;
              background-size: initial;
              background-repeat: initial;
              background-attachment: initial;
              background-origin: initial;
              background-clip: initial;
              word-spacing: 0px;
              "
              >
              <span
                 lang="EN-IN"
                 style="
                 color: #242424;
                 border: none windowtext 1pt;
                 mso-border-alt: none windowtext 0in;
                 padding: 0in;
                 mso-ansi-language: EN-IN;
                 "
                 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span
                 >
              <span lang="EN-IN" style="mso-ansi-language: EN-IN">
                 <o:p></o:p>
              </span>
           </p>
           <p class="xxxmsonormal" style="margin: 0in; background: white">
              <span
                 lang="EN-IN"
                 style="
                 color: #242424;
                 border: none windowtext 1pt;
                 mso-border-alt: none windowtext 0in;
                 padding: 0in;
                 mso-ansi-language: EN-IN;
                 "
                 >Good Day!!</span
                 >
              <span lang="EN-IN" style="mso-ansi-language: EN-IN">
                 <o:p></o:p>
              </span>
           </p>
           <p>
              <span
                 lang="EN-IN"
                 style="
                 font-size: 11pt;
                 font-family: 'Calibri', sans-serif;
                 color: black;
                 border: none windowtext 1pt;
                 mso-border-alt: none windowtext 0in;
                 padding: 0in;
                 mso-ansi-language: EN-IN;
                 "
                 >Here's an advisory</span
                 ><span
                 lang="EN-IN"
                 style="
                 color: black;
                 border: none windowtext 1pt;
                 mso-border-alt: none windowtext 0in;
                 padding: 0in;
                 mso-ansi-language: EN-IN;
                 "
                 >
              </span
                 ><span
                 lang="EN-IN"
                 style="
                 font-size: 11pt;
                 font-family: 'Calibri', sans-serif;
                 color: black;
                 border: none windowtext 1pt;
                 mso-border-alt: none windowtext 0in;
                 padding: 0in;
                 mso-ansi-language: EN-IN;
                 "
                 >on</span
                 ><span lang="EN-IN" style="mso-ansi-language: EN-IN"> </span
                 ><span style="font-size: 11pt; font-family: 'Calibri', sans-serif"
                 >a ${title}</span
                 >
              <o:p></o:p>
           </p>
           <table
              class="MsoNormalTable"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="
              max-width: 483.75pt;
              background: white;
              border-collapse: collapse;
              mso-yfti-tbllook: 1184;
              mso-padding-alt: 0in 0in 0in 0in;
              "
              >
              <tr
                 style="
                 mso-yfti-irow: 0;
                 mso-yfti-firstrow: yes;
                 mso-yfti-lastrow: yes;
                 "
                 >
                 <td style="padding: 0.75pt 0.75pt 0.75pt 0.75pt">
                    <table
                       class="MsoNormalTable"
                       border="0"
                       cellspacing="0"
                       cellpadding="0"
                       style="
                       max-width: 483.75pt;
                       background: black;
                       border-collapse: collapse;
                       mso-yfti-tbllook: 1184;
                       mso-padding-alt: 0in 0in 0in 0in;
                       "
                       >
                       <tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes">
                          <td style="padding: 15pt 15pt 0.75pt 15pt">
                             <table
                                class="MsoNormalTable"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                                style="
                                max-width: 483.75pt;
                                border-collapse: collapse;
                                mso-yfti-tbllook: 1184;
                                mso-padding-alt: 0in 0in 0in 0in;
                                "
                                >
                                <tr
                                   style="
                                   mso-yfti-irow: 0;
                                   mso-yfti-firstrow: yes;
                                   mso-yfti-lastrow: yes;
                                   height: 21.8pt;
                                   "
                                   >
                                   <td
                                      width="30%"
                                      style="
                                      width: 30%;
                                      padding: 0.75pt 0.75pt 0.75pt 0.75pt;
                                      height: 21.8pt;
                                      "
                                      >
                                      <p class="MsoNormal">
                                         <span
                                            style="
                                            font-size: 12pt;
                                            font-family: Montserrat;
                                            color: white;
                                            "
                                            ><img
                                            width="150"
                                            height="50"
                                            id="_x0000_i1025"
                                            src="https://res.cloudinary.com/dqh4gm7ow/image/upload/v1708684561/eventus/pgezwlo8lj4stmc40kd5.png"
                                            style="height: 0.52in; width: 1.562in" /></span
                                            >
                                         <o:p></o:p>
                                      </p>
                                   </td>
                                   <td
                                      width="40%"
                                      style="
                                      width: 40%;
                                      padding: 0.75pt 0.75pt 0.75pt 0.75pt;
                                      height: 21.8pt;
                                      "
                                      ></td>
                                   <td
                                      width="30%"
                                      style="
                                      width: 30%;
                                      padding: 0.75pt 0.75pt 0.75pt 0.75pt;
                                      height: 21.8pt;
                                      "
                                      >
                                      <p class="MsoNormal">
                                         <span
                                            style="
                                            font-size: 12pt;
                                            font-family: Montserrat;
                                            color: white;
                                            "
                                            ><img
                                            width="150"
                                            height="50"
                                            id="_x0000_i1026"
                                            src="https://res.cloudinary.com/dqh4gm7ow/image/upload/v1708684481/eventus/qjljiohgfk8xdnvdxjuy.png"
                                            style="height: 0.52in; width: 1.562in" /></span
                                            >
                                         <o:p></o:p>
                                      </p>
                                   </td>
                                </tr>
                             </table>
                          </td>
                       </tr>
                       <tr style="mso-yfti-irow: 1">
                          <td style="padding: 0.75pt 0.75pt 0.75pt 0.75pt">
                             <p
                                align="center"
                                style="
                                margin-top: 15pt;
                                margin-right: 0in;
                                margin-bottom: 15pt;
                                margin-left: 0in;
                                text-align: center;
                                "
                                >
                                <b
                                   ><span
                                   style="
                                   font-size: 31.5pt;
                                   font-family: Montserrat;
                                   color: white;
                                   "
                                   >THREAT ADVISORY</span
                                   ></b
                                   >
                                <b
                                   >
                                   <span style="font-size: 31.5pt; color: white"
                                      >
                                      <o:p></o:p>
                                   </span
                                      >
                                </b>
                             </p>
                          </td>
                       </tr>
                       <tr style="mso-yfti-irow: 2">
                          <td style="padding: 0.75pt 0.75pt 0.75pt 0.75pt">
                             <p class="MsoNormal">
                                <span
                                   style="
                                   font-size: 12pt;
                                   font-family: Montserrat;
                                   color: white;
                                   "
                                   ><img
                                   width="685"
                                   height="121"
                                   id="_x0000_i1027"
                                   src="https://res.cloudinary.com/dqh4gm7ow/image/upload/v1709096344/eventus/gfxssgpqa75tzur8bd5x.png"
                                   style="height: 1.256in; width: 7.131in" /></span
                                   >
                                <o:p></o:p>
                             </p>
                          </td>
                       </tr>
                       <tr style="mso-yfti-irow: 3; mso-yfti-lastrow: yes">
                          <td style="padding: 15pt 15pt 15pt 15pt">
                             <p class="MsoNormal">
                                <b
                                   >
                                   <span style="font-size: 18pt; color: white"
                                      >
                                      ${title}
                                      <o:p></o:p>
                                   </span
                                      >
                                </b>
                             </p>
                             <p class="MsoNormal">
                                <span style="font-size: 12pt">
                                   <o:p>&nbsp;</o:p>
                                </span>
                             </p>
                             <table
                                class="MsoNormalTable"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                                width="100%"
                                style="
                                width: 100%;
                                border-collapse: collapse;
                                mso-yfti-tbllook: 1184;
                                mso-padding-alt: 0in 0in 0in 0in;
                                "
                                >
                                <tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes">
                                   <td style="padding: 0.75pt 0.75pt 0.75pt 0.75pt"></td>
                                </tr>
                                <tr style="mso-yfti-irow: 1; mso-yfti-lastrow: yes">
                                   <td style="padding: 0.75pt 0.75pt 0.75pt 0.75pt">
                                      <table
                                         class="MsoNormalTable"
                                         border="0"
                                         cellspacing="0"
                                         cellpadding="0"
                                         width="100%"
                                         style="
                                         width: 100%;
                                         border-collapse: collapse;
                                         mso-yfti-tbllook: 1184;
                                         mso-padding-alt: 0in 0in 0in 0in;
                                         border-spacing: 0px;
                                         box-sizing: border-box;
                                         "
                                         >
                                         <tr
                                            style="
                                            mso-yfti-irow: 0;
                                            mso-yfti-firstrow: yes;
                                            mso-yfti-lastrow: yes;
                                            "
                                            >
                                            <td
                                               width="283"
                                               style="
                                               width: 211.9pt;
                                               padding: 0.75pt 0.75pt 0.75pt 0.75pt;
                                               "
                                               >
                                               <p style="margin-bottom: 7.5pt">
                                                  <span
                                                     style="
                                                     font-size: 13.5pt;
                                                     font-family: Montserrat;
                                                     color: white;
                                                     "
                                                     >TLP : Amber</span
                                                     >
                                                  <span style="font-size: 11pt"
                                                     >
                                                     <o:p></o:p
                                                        >
                                                  </span>
                                               </p>
                                               <p class="MsoNormal">
                                                  <span
                                                     style="
                                                     font-size: 13.5pt;
                                                     font-family: Montserrat;
                                                     color: white;
                                                     "
                                                     ><img
                                                     width="100"
                                                     height="34"
                                                     id="_x0000_i1028"
                                                     src="https://res.cloudinary.com/dqh4gm7ow/image/upload/v1708684286/eventus/twywcu3ubnzk2qkhvln2.png"
                                                     style="
                                                     height: 0.354in;
                                                     width: 1.041in;
                                                     " /></span
                                                     >
                                                  <o:p></o:p>
                                               </p>
                                               <p>
                                                  <b
                                                     ><span
                                                     style="
                                                     font-size: 13.5pt;
                                                     font-family: Montserrat;
                                                     color: white;
                                                     "
                                                     >Threat</span
                                                     ></b
                                                     ><span
                                                     style="
                                                     font-size: 13.5pt;
                                                     font-family: Montserrat;
                                                     color: white;
                                                     "
                                                     >&nbsp;| ${threatType}</span
                                                     >
                                                  <span style="font-size: 13.5pt"
                                                     >
                                                     <o:p></o:p
                                                        >
                                                  </span>
                                               </p>
                                            </td>
                                            <td
                                               width="283"
                                               valign="bottom"
                                               style="
                                               width: 211.9pt;
                                               padding: 0.75pt 0.75pt 0.75pt 0.75pt;
                                               "
                                               >
                                               <p align="right" style="text-align: right">
                                                  <b
                                                     ><span
                                                     style="
                                                     font-size: 13.5pt;
                                                     font-family: Montserrat;
                                                     color: white;
                                                     "
                                                     >Criticality</span
                                                     ></b
                                                     ><span
                                                     style="
                                                     font-size: 13.5pt;
                                                     font-family: Montserrat;
                                                     color: white;
                                                     "
                                                     >&nbsp;| ${severityLevel}</span
                                                     >
                                                  <span style="font-size: 13.5pt"
                                                     >
                                                     <o:p></o:p
                                                        >
                                                  </span>
                                               </p>
                                            </td>
                                         </tr>
                                      </table>
                                   </td>
                                </tr>
                             </table>
                             <p class="MsoNormal">
                                <span
                                   style="font-size: 12pt; font-family: 'Aptos', sans-serif"
                                   >
                                   <o:p></o:p
                                      >
                                </span>
                             </p>
                          </td>
                       </tr>
                    </table>
                    <p class="MsoNormal">
                       <span style="color: white; display: none; mso-hide: all"
                          >
                          <o:p>&nbsp;</o:p>
                       </span
                          >
                    </p>
                    <table
                       class="MsoNormalTable"
                       border="0"
                       cellspacing="0"
                       cellpadding="0"
                       style="
                       max-width: 449.1pt;
                       background: white;
                       border-collapse: collapse;
                       mso-yfti-tbllook: 1184;
                       mso-padding-alt: 0in 0in 0in 0in;
                       border-spacing: 0px;
                       box-sizing: border-box;
                       "
                       >
                       <tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes">
                          <td
                             width="599"
                             style="width: 449.1pt; padding: 0.75pt 0.75pt 0.75pt 0.75pt"
                             >
                             <p class="MsoNormal">
                                <span
                                   style="font-size: 12pt; font-family: 'Aptos', sans-serif"
                                   >
                                   <o:p>&nbsp;</o:p>
                                </span
                                   >
                             </p>
                             ${
                               targetedSector &&
                               `<p>
                              <b
                                 ><span
                                 style="
                                 font-size: 11pt;
                                 font-family: Montserrat;
                                 color: #7800d9;
                                 "
                                 >Targeted Sector</span
                                 ></b
                                 ><b
                                 ><span style="font-size: 11pt; color: #7800d9">
                              :</span
                                 ></b
                                 >
                              <b
                                 >
                                 <span style="font-size: 11pt; color: black"
                                    >
                                    &nbsp;${targetedSector}
                                    <o:p></o:p>
                                 </span
                                    >
                              </b>
                           </p>`
                             }
                             ${
                               targetedRegion &&
                               `<p class="MsoNormal">
                              <b
                                 ><span
                                 style="
                                 font-size: 12pt;
                                 font-family: Montserrat;
                                 color: #7800d9;
                                 "
                                 >Targeted Region</span
                                 ></b
                                 ><b
                                 ><span style="font-size: 12pt; color: #7800d9">
                              :</span
                                 ></b
                                 >
                              <b
                                 >
                                 <span style="font-size: 12pt; color: black"
                                    >
                                    &nbsp;${targetedRegion}
                                    <o:p></o:p>
                                 </span
                                    >
                              </b>
                           </p>`
                             }
                             ${
                               threatActorType &&
                               `<p class="MsoNormal">
                              <b
                                 ><span
                                 style="
                                 font-size: 12pt;
                                 font-family: Montserrat;
                                 color: #7800d9;
                                 "
                                 >Threat Actor Type</span
                                 ></b
                                 ><b
                                 ><span style="font-size: 12pt; color: #7800d9">
                              :</span
                                 ></b
                                 >
                              <b
                                 >
                                 <span style="font-size: 12pt; color: black"
                                    >
                                    &nbsp;${threatActorType}
                                    <o:p></o:p>
                                 </span
                                    >
                              </b>
                           </p>`
                             }
                             ${
                               threatActorRegion &&
                               `<p class="MsoNormal">
                              <b
                                 ><span
                                 style="
                                 font-size: 12pt;
                                 font-family: Montserrat;
                                 color: #7800d9;
                                 "
                                 >Threat Actor Region</span
                                 ></b
                                 ><b
                                 ><span style="font-size: 12pt; color: #7800d9">
                              :</span
                                 ></b
                                 >
                              <b
                                 >
                                 <span style="font-size: 12pt; color: black"
                                    >
                                    &nbsp;${threatActorRegion}
                                    <o:p></o:p>
                                 </span
                                    >
                              </b>
                           </p>`
                             }
                             ${
                               tags &&
                               tags.map(
                                 (tag) =>
                                   Object.entries(tag)
                                     .map(
                                       ([key, obj]) =>
                                         Object.entries(obj)
                                           .map(([key1, value1]) => {
                                             if (key1 === 'value') {
                                               // Join the values with a comma and space, all in one line
                                               const joinedValues = value1.join(', ')
                                               return `
                                        <p class="MsoNormal">
                                          <b>
                                            <span
                                              style="
                                                font-size: 12pt;
                                                font-family: Montserrat;
                                                color: #7800d9;
                                              "
                                            >${key}</span></b
                                          ><b><span style="font-size: 12pt; color: #7800d9">:</span></b>
                                          <b>
                                            <span style="font-size: 12pt; color: black">
                                              &nbsp;${joinedValues}<o:p></o:p>
                                            </span>
                                          </b>
                                        </p>
                                      `
                                             }
                                             return '' // Return empty string if key1 is not 'value'
                                           })
                                           .join(''), // Join second level without commas
                                     )
                                     .join(''), // Join first level without commas
                               )
                             }
                            
                             <p class="MsoNormal">
                                <span style="font-size: 12pt">
                                   <o:p>&nbsp;</o:p>
                                </span>
                             </p>
                             <p class="MsoNormal">
                                <span
                                   style="
                                   font-size: 12pt;
                                   font-family: Montserrat;
                                   color: black;
                                   "
                                   ><img
                                   width="100"
                                   height="7"
                                   id="_x0000_i1029"
                                   src="https://res.cloudinary.com/dqh4gm7ow/image/upload/v1708602319/eventus/lmyxvl6vhxc5b1g2w0cq.png"
                                   style="height: 0.069in; width: 1.041in" /></span
                                   >
                                <b
                                   >
                                   <span style="font-size: 16.5pt; font-family: Montserrat"
                                      >
                                      <o:p></o:p>
                                   </span
                                      >
                                </b>
                             </p>
                             <p class="MsoNormal">
                                <b>
                                   <o:p>&nbsp;</o:p>
                                </b>
                             </p>
                             <p class="MsoNormal">
                                <b
                                   ><span
                                   style="
                                   font-size: 16.5pt;
                                   font-family: Montserrat;
                                   color: #7800d9;
                                   "
                                   >EXECUTIVE SUMMARY</span
                                   ></b
                                   >
                                <b
                                   >
                                   <span style="font-size: 16.5pt; font-family: Montserrat"
                                      >
                                      <o:p></o:p>
                                   </span
                                      >
                                </b>
                             </p>
                             <p class="MsoNormal" style="text-align: justify">
                                <span style="color: black">
                                   <o:p>&nbsp;</o:p>
                                </span>
                             </p>
                             <p class="MsoNormal" style="text-align: justify">
                                <span style="color: black">${summary}</span
                                   >
                                <o:p></o:p>
                             </p>
                             <p
                                class="xxxxxxxmsonormal"
                                style="margin: 0in; text-align: justify"
                                >
                                <span style="font-size: 12pt">
                                   <o:p>&nbsp;</o:p>
                                </span>
                             </p>
                          </td>
                       </tr>
                       <tr style="mso-yfti-irow: 1">
                          <td
                             width="599"
                             style="width: 449.1pt; padding: 0.75pt 0.75pt 0.75pt 0.75pt"
                             >
                             <p class="MsoNormal">
                                <span
                                   style="
                                   font-size: 12pt;
                                   font-family: Montserrat;
                                   color: black;
                                   "
                                   ><img
                                   width="100"
                                   height="7"
                                   id="_x0000_i1030"
                                   src="https://res.cloudinary.com/dqh4gm7ow/image/upload/v1708602319/eventus/lmyxvl6vhxc5b1g2w0cq.png"
                                   style="height: 0.069in; width: 1.041in" /></span
                                   >
                                <span style="color: black">
                                   <o:p></o:p>
                                </span>
                             </p>
                             <p style="margin-bottom: 11.25pt">
                                <b
                                   ><span
                                   style="
                                   font-size: 16.5pt;
                                   font-family: Montserrat;
                                   color: #7800d9;
                                   "
                                   >THREAT PROFILE:</span
                                   ></b
                                   >
                                <b
                                   >
                                   <span style="font-size: 16.5pt; font-family: Montserrat"
                                      >
                                      <o:p></o:p>
                                   </span
                                      >
                                </b>
                             </p>
                          </td>
                       </tr>
                       <tr>
                           <td>
                              <table
                                 class="MsoNormalTable"
                                 border="0"
                                 cellspacing="0"
                                 cellpadding="0"
                                 width="545"
                                 style="
                                    width: 408.4pt;
                                    border-collapse: collapse;
                                    mso-yfti-tbllook: 1184;
                                    mso-padding-alt: 0in 0in 0in 0in;
                                 "
                              >
                                 <tr
                                    style="
                                    mso-yfti-irow: 0;
                                    mso-yfti-firstrow: yes;
                                    height: 16pt;
                                    "
                                 >
                                    <td
                                    width="174"
                                    nowrap
                                    style="
                                       width: 130.3pt;
                                       border: solid windowtext 1pt;
                                       background: #7800d9;
                                       padding: 0in 5.4pt 0in 5.4pt;
                                       height: 16pt;
                                    "
                                    >
                                    <p class="MsoNormal" align="center" style="text-align: center">
                                       <b>
                                          <span style="font-size: 12pt; color: white">Tactic<o:p></o:p></span>
                                       </b>
                                    </p>
                                    </td>
                                    <td
                                    width="108"
                                    nowrap
                                    style="
                                       width: 80.8pt;
                                       border: solid windowtext 1pt;
                                       border-left: none;
                                       background: #7800d9;
                                       padding: 0in 5.4pt 0in 5.4pt;
                                       height: 16pt;
                                    "
                                    >
                                    <p class="MsoNormal" align="center" style="text-align: center">
                                       <b>
                                          <span style="font-size: 12pt; color: white">Technique Id<o:p></o:p></span>
                                       </b>
                                    </p>
                                    </td>
                                    <td
                                    width="263"
                                    nowrap
                                    style="
                                       width: 197.3pt;
                                       border: solid windowtext 1pt;
                                       border-left: none;
                                       background: #7800d9;
                                       padding: 0in 5.4pt 0in 5.4pt;
                                       height: 16pt;
                                    "
                                    >
                                    <p class="MsoNormal" align="center" style="text-align: center">
                                       <b>
                                          <span style="font-size: 12pt; color: white">Technique<o:p></o:p></span>
                                       </b>
                                    </p>
                                    </td>
                                 </tr>
                                 ${mitres
                                   .map(
                                     (mitre, index) => `
                                 <tr key=${index} style="mso-yfti-irow: 1; height: 16pt">
                                    <td
                                    width="174"
                                    nowrap
                                    style="
                                       width: 130.3pt;
                                       border: solid windowtext 1pt;
                                       border-top: none;
                                       background: #e7caff;
                                       padding: 0in 5.4pt 0in 5.4pt;
                                       height: 16pt;
                                    "
                                    >
                                    <p class="MsoNormal" align="center" style="text-align: center">
                                       <span style="font-size: 12pt; color: black">
                                          ${mitre.split('-')[0]}
                                          <o:p></o:p>
                                       </span>
                                    </p>
                                    </td>
                                    <td
                                    width="108"
                                    nowrap
                                    style="
                                       width: 80.8pt;
                                       border-top: none;
                                       border-left: none;
                                       border-bottom: solid windowtext 1pt;
                                       border-right: solid windowtext 1pt;
                                       background: #e7caff;
                                       padding: 0in 5.4pt 0in 5.4pt;
                                       height: 16pt;
                                    "
                                    >
                                    <p class="MsoNormal" align="center" style="text-align: center">
                                       <span style="font-size: 12pt; color: black">
                                          ${mitre.split('-')[1]}
                                          <o:p></o:p>
                                       </span>
                                    </p>
                                    </td>
                                    <td
                                    width="263"
                                    nowrap
                                    style="
                                       width: 197.3pt;
                                       border-top: none;
                                       border-left: none;
                                       border-bottom: solid windowtext 1pt;
                                       border-right: solid windowtext 1pt;
                                       background: #e7caff;
                                       padding: 0in 5.4pt 0in 5.4pt;
                                       height: 16pt;
                                    "
                                    >
                                    <p class="MsoNormal" align="center" style="text-align: center">
                                       <span style="font-size: 12pt; color: black">
                                          ${mitre.split('-')[2]}
                                          <o:p></o:p>
                                       </span>
                                    </p>
                                    </td>
                                 </tr>
                                 `,
                                   )
                                   .join('')}
                              </table>
                           </td>
                       </tr>
                       <tr style="mso-yfti-irow: 2">
                          <td
                             width="599"
                             style="width: 449.1pt; padding: 0.75pt 0.75pt 0.75pt 0.75pt"
                             >
                             <p class="MsoNormal">
                                <span
                                   style="
                                   font-size: 10pt;
                                   font-family: 'Times New Roman', serif;
                                   "
                                   >
                                   <o:p>&nbsp;</o:p>
                                </span
                                   >
                             </p>
                          </td>
                       </tr>
                       <tr style="mso-yfti-irow: 3; mso-yfti-lastrow: yes">
                          <td
                             width="599"
                             style="width: 449.1pt; padding: 0.75pt 0.75pt 0.75pt 0.75pt"
                             >
                             <p style="margin-bottom: 11.25pt">
                                <b
                                   >
                                   <span
                                      style="
                                      font-size: 16.5pt;
                                      font-family: Montserrat;
                                      color: #7800d9;
                                      "
                                      >
                                      <img
                                         width="100"
                                         height="7"
                                         id="_x0000_i1031"
                                         src="https://res.cloudinary.com/dqh4gm7ow/image/upload/v1708602319/eventus/lmyxvl6vhxc5b1g2w0cq.png"
                                         style="
                                         height: 0.069in;
                                         width: 1.041in;
                                         " />
                                      <o:p></o:p>
                                   </span
                                      >
                                </b>
                             </p>
                             <p style="margin-bottom: 11.25pt">
                                <span
                                   style="
                                   font-size: 11pt;
                                   font-family: 'Calibri', sans-serif;
                                   color: black;
                                   mso-color-alt: windowtext;
                                   "
                                   >STRINGTOBEREPLACED</span
                                   >
                                <span
                                   style="
                                   font-size: 11pt;
                                   font-family: 'Calibri', sans-serif;
                                   "
                                   >
                                   <o:p></o:p
                                      >
                                </span>
                             </p>
                             <p style="margin-bottom: 11.25pt">
                                <b
                                   ><span
                                   style="
                                   font-size: 16.5pt;
                                   font-family: Montserrat;
                                   color: #7800d9;
                                   "
                                   >REFERENCES:</span
                                   ></b
                                   >
                                <b
                                   >
                                   <span style="font-size: 16.5pt; color: #0070c0"
                                      >
                                      <o:p></o:p>
                                   </span
                                      >
                                </b>
                             </p>
                             <p class="MsoNormal">
                                <span
                                   style="
                                   font-size: 12pt;
                                   font-family: 'Aptos', sans-serif;
                                   color: black;
                                   "
                                   >The following reports contain further technical
                                details:</span
                                   ><span style="color: black"><br /> </span
                                   ><span style="color: #0070c0"
                                   ><a href="${feedLink}"
                                   ><span style="color: #0070c0">${feedLink}</span></a
                                   ></span
                                   >
                                <o:p></o:p>
                             </p>
                             <p class="MsoNormal">
                                <o:p>&nbsp;</o:p>
                             </p>
                             <p>
                                <b
                                   ><span
                                   style="
                                   font-size: 10.5pt;
                                   font-family: Montserrat;
                                   color: black;
                                   "
                                   >This Document is marked as TLP Amber, information
                                contained in this document should be shared in
                                need-to-know basis.</span
                                   ></b
                                   >
                                <span style="font-size: 11pt; color: black"
                                   >
                                   <o:p></o:p
                                      >
                                </span>
                             </p>
                          </td>
                       </tr>
                    </table>
                    <p class="MsoNormal">
                       <span style="color: white; display: none; mso-hide: all"
                          >
                          <o:p>&nbsp;</o:p>
                       </span
                          >
                    </p>
                    <table
                       class="MsoNormalTable"
                       border="0"
                       cellspacing="0"
                       cellpadding="0"
                       style="
                       max-width: 483.75pt;
                       background: black;
                       border-collapse: collapse;
                       mso-yfti-tbllook: 1184;
                       mso-padding-alt: 0in 0in 0in 0in;
                       border-spacing: 0px;
                       box-sizing: border-box;
                       "
                       >
                       <tr
                          style="
                          mso-yfti-irow: 0;
                          mso-yfti-firstrow: yes;
                          mso-yfti-lastrow: yes;
                          "
                          >
                          <td
                             width="186"
                             valign="top"
                             style="width: 139.3pt; padding: 15pt 0.75pt 0.75pt 30pt"
                             >
                             <p style="margin-bottom: 3.75pt">
                                <b
                                   ><span
                                   style="
                                   font-size: 10.5pt;
                                   font-family: Montserrat;
                                   color: white;
                                   "
                                   >REPORT GENERATED ON</span
                                   ></b
                                   >
                                <b
                                   >
                                   <span style="font-size: 10.5pt; color: white"
                                      >
                                      <o:p></o:p>
                                   </span
                                      >
                                </b>
                             </p>
                             <p>
                                <span
                                   style="
                                   font-size: 10pt;
                                   font-family: Montserrat;
                                   color: white;
                                   "
                                   >${date.toLocaleDateString('en-US', {
                                     year: 'numeric',
                                     month: 'long',
                                     day: '2-digit',
                                   })}</span
                                   >
                                <span style="font-size: 10pt; color: white"
                                   >
                                   <o:p></o:p
                                      >
                                </span>
                             </p>
                          </td>
                          <td
                             width="419"
                             style="width: 314.45pt; padding: 0.75pt 0.75pt 0.75pt 0.75pt"
                             >
                             <p class="MsoNormal">
                                <span style="color: white"
                                   >
                                   <a href="https://eventussecurity.com/contact-us/"
                                      ><span
                                      style="
                                      font-size: 12pt;
                                      font-family: Montserrat;
                                      color: blue;
                                      text-decoration: none;
                                      text-underline: none;
                                      "
                                      ><img
                                      border="0"
                                      width="419"
                                      height="137"
                                      id="_x0000_i1032"
                                      src="https://res.cloudinary.com/dqh4gm7ow/image/upload/v1708602316/eventus/h9vgifgsyrsnomhir5wq.png"
                                      style="height: 1.43in; width: 4.368in" /></span></a
                                      >
                                   <o:p></o:p
                                      >
                                </span>
                             </p>
                          </td>
                       </tr>
                    </table>
                    <p class="MsoNormal">
                       <span style="font-size: 12pt; font-family: 'Aptos', sans-serif"
                          >
                          <o:p></o:p
                             >
                       </span>
                    </p>
                 </td>
              </tr>
           </table>
           <p class="MsoNormal">
              <span
                 style="
                 font-family: 'Aptos', sans-serif;
                 mso-ascii-theme-font: minor-latin;
                 mso-hansi-theme-font: minor-latin;
                 mso-bidi-font-family: 'Times New Roman';
                 mso-bidi-theme-font: minor-bidi;
                 "
                 >
                 <o:p>&nbsp;</o:p>
              </span
                 >
           </p>
        </div>
     </body>
  </html>
  `
}
