import React from 'react';

import axios from "axios";
import { connect } from "react-redux";

import { withRouter } from 'react-router-dom';




class EditorPage extends React.Component {


   constructor(props) {
      super(props);
      
      
      this.h5pLib = props.resource.editor; //"H5P.Audio 1.4";



   }
   componentDidMount() {
      // console.log(this.state);
      // this.h5pLib = "H5P.MultiChoice 1.14";
      window.H5PIntegration = {
         "baseUrl": global.config.h5pBaseUrl,
         "url": "/storage/h5p",
         "postUserStatistics": true,
         "ajax": {
            "setFinished": global.config.h5pAjaxUrl+"/api/ajax/finish",
            "contentUserData": global.config.h5pAjaxUrl+"/api/ajax/content-user-data/?content_id=:contentId&data_type=:dataType&sub_content_id=:subContentId"
         },
         "saveFreq": false,
         "siteUrl": global.config.h5pBaseUrl,
         "l10n": {
            "H5P": {
               "fullscreen": "Fullscreen",
               "disableFullscreen": "Disable fullscreen",
               "download": "Download",
               "copyrights": "Rights of use",
               "embed": "Embed",
               "size": "Size",
               "showAdvanced": "Show advanced",
               "hideAdvanced": "Hide advanced",
               "advancedHelp": "Include this script on your website if you want dynamic sizing of the embedded content:",
               "copyrightInformation": "Rights of use",
               "close": "Close",
               "title": "Title",
               "author": "Author",
               "year": "Year",
               "source": "Source",
               "license": "License",
               "thumbnail": "Thumbnail",
               "noCopyrights": "No copyright information available for this content.",
               "downloadDescription": "Download this content as a H5P file.",
               "copyrightsDescription": "View copyright information for this content.",
               "embedDescription": "View the embed code for this content.",
               "h5pDescription": "Visit H5P.org to check out more cool content.",
               "contentChanged": "This content has changed since you last used it.",
               "startingOver": "You'll be starting over.",
               "confirmDialogHeader": "Confirm action",
               "confirmDialogBody": "Please confirm that you wish to proceed. This action is not reversible.",
               "cancelLabel": "Cancel",
               "confirmLabel": "Confirm",
               "reuse": "Reuse",
               "reuseContent": "Reuse Content"
            }
         },
         "hubIsEnabled": false,
         "user": {
            "name": "localuser",
            "mail": "localuser@local.com"
         },
         "editor": {
            "filesPath": "/h5p/editor",
            "fileIcon": {
               "path": "/h5p/h5p-editor/images/binary-file.png",
               "width": 50,
               "height": 50
            },
            "ajaxPath": global.config.h5pAjaxUrl+"/api/ajax/",
            "libraryUrl": "/h5p/h5p-editor/",
            "copyrightSemantics": {
               "name": "copyright",
               "type": "group",
               "label": "Copyright information",
               "fields": [
                  {
                     "name": "title",
                     "type": "text",
                     "label": "Title",
                     "placeholder": "La Gioconda",
                     "optional": true
                  },
                  {
                     "name": "author",
                     "type": "text",
                     "label": "Author",
                     "placeholder": "Leonardo da Vinci",
                     "optional": true
                  },
                  {
                     "name": "year",
                     "type": "text",
                     "label": "Year(s)",
                     "placeholder": "1503 - 1517",
                     "optional": true
                  },
                  {
                     "name": "source",
                     "type": "text",
                     "label": "Source",
                     "placeholder": "http://en.wikipedia.org/wiki/Mona_Lisa",
                     "optional": true,
                     "regexp": {
                        "pattern": "^http[s]?://.+",
                        "modifiers": "i"
                     }
                  },
                  {
                     "name": "license",
                     "type": "select",
                     "label": "License",
                     "default": "U",
                     "options": [
                        {
                           "value": "U",
                           "label": "Undisclosed"
                        },
                        {
                           "value": "CC BY",
                           "label": "Attribution",
                           "versions": [
                              {
                                 "value": "4.0",
                                 "label": "4.0 International"
                              },
                              {
                                 "value": "3.0",
                                 "label": "3.0 Unported"
                              },
                              {
                                 "value": "2.5",
                                 "label": "2.5 Generic"
                              },
                              {
                                 "value": "2.0",
                                 "label": "2.0 Generic"
                              },
                              {
                                 "value": "1.0",
                                 "label": "1.0 Generic"
                              }
                           ]
                        },
                        {
                           "value": "CC BY-SA",
                           "label": "Attribution-ShareAlike",
                           "versions": [
                              {
                                 "value": "4.0",
                                 "label": "4.0 International"
                              },
                              {
                                 "value": "3.0",
                                 "label": "3.0 Unported"
                              },
                              {
                                 "value": "2.5",
                                 "label": "2.5 Generic"
                              },
                              {
                                 "value": "2.0",
                                 "label": "2.0 Generic"
                              },
                              {
                                 "value": "1.0",
                                 "label": "1.0 Generic"
                              }
                           ]
                        },
                        {
                           "value": "CC BY-ND",
                           "label": "Attribution-NoDerivs",
                           "versions": [
                              {
                                 "value": "4.0",
                                 "label": "4.0 International"
                              },
                              {
                                 "value": "3.0",
                                 "label": "3.0 Unported"
                              },
                              {
                                 "value": "2.5",
                                 "label": "2.5 Generic"
                              },
                              {
                                 "value": "2.0",
                                 "label": "2.0 Generic"
                              },
                              {
                                 "value": "1.0",
                                 "label": "1.0 Generic"
                              }
                           ]
                        },
                        {
                           "value": "CC BY-NC",
                           "label": "Attribution-NonCommercial",
                           "versions": [
                              {
                                 "value": "4.0",
                                 "label": "4.0 International"
                              },
                              {
                                 "value": "3.0",
                                 "label": "3.0 Unported"
                              },
                              {
                                 "value": "2.5",
                                 "label": "2.5 Generic"
                              },
                              {
                                 "value": "2.0",
                                 "label": "2.0 Generic"
                              },
                              {
                                 "value": "1.0",
                                 "label": "1.0 Generic"
                              }
                           ]
                        },
                        {
                           "value": "CC BY-NC-SA",
                           "label": "Attribution-NonCommercial-ShareAlike",
                           "versions": [
                              {
                                 "value": "4.0",
                                 "label": "4.0 International"
                              },
                              {
                                 "value": "3.0",
                                 "label": "3.0 Unported"
                              },
                              {
                                 "value": "2.5",
                                 "label": "2.5 Generic"
                              },
                              {
                                 "value": "2.0",
                                 "label": "2.0 Generic"
                              },
                              {
                                 "value": "1.0",
                                 "label": "1.0 Generic"
                              }
                           ]
                        },
                        {
                           "value": "CC BY-NC-ND",
                           "label": "Attribution-NonCommercial-NoDerivs",
                           "versions": [
                              {
                                 "value": "4.0",
                                 "label": "4.0 International"
                              },
                              {
                                 "value": "3.0",
                                 "label": "3.0 Unported"
                              },
                              {
                                 "value": "2.5",
                                 "label": "2.5 Generic"
                              },
                              {
                                 "value": "2.0",
                                 "label": "2.0 Generic"
                              },
                              {
                                 "value": "1.0",
                                 "label": "1.0 Generic"
                              }
                           ]
                        },
                        {
                           "value": "GNU GPL",
                           "label": "General Public License",
                           "versions": [
                              {
                                 "value": "v3",
                                 "label": "Version 3"
                              },
                              {
                                 "value": "v2",
                                 "label": "Version 2"
                              },
                              {
                                 "value": "v1",
                                 "label": "Version 1"
                              }
                           ]
                        },
                        {
                           "value": "PD",
                           "label": "Public Domain",
                           "versions": [
                              {
                                 "value": "-",
                                 "label": "-"
                              },
                              {
                                 "value": "CC0 1.0",
                                 "label": "CC0 1.0 Universal"
                              },
                              {
                                 "value": "CC PDM",
                                 "label": "Public Domain Mark"
                              }
                           ]
                        },
                        {
                           "value": "C",
                           "label": "Copyright"
                        }
                     ]
                  },
                  {
                     "name": "version",
                     "type": "select",
                     "label": "License Version",
                     "options": [

                     ]
                  }
               ]
            },
            "metadataSemantics": [
               {
                  "name": "title",
                  "type": "text",
                  "label": "Title",
                  "placeholder": "La Gioconda"
               },
               {
                  "name": "license",
                  "type": "select",
                  "label": "License",
                  "default": "U",
                  "options": [
                     {
                        "value": "U",
                        "label": "Undisclosed"
                     },
                     {
                        "type": "optgroup",
                        "label": "Creative Commons",
                        "options": [
                           {
                              "value": "CC BY",
                              "label": "Attribution (CC BY)",
                              "versions": [
                                 {
                                    "value": "4.0",
                                    "label": "4.0 International"
                                 },
                                 {
                                    "value": "3.0",
                                    "label": "3.0 Unported"
                                 },
                                 {
                                    "value": "2.5",
                                    "label": "2.5 Generic"
                                 },
                                 {
                                    "value": "2.0",
                                    "label": "2.0 Generic"
                                 },
                                 {
                                    "value": "1.0",
                                    "label": "1.0 Generic"
                                 }
                              ]
                           },
                           {
                              "value": "CC BY-SA",
                              "label": "Attribution-ShareAlike (CC BY-SA)",
                              "versions": [
                                 {
                                    "value": "4.0",
                                    "label": "4.0 International"
                                 },
                                 {
                                    "value": "3.0",
                                    "label": "3.0 Unported"
                                 },
                                 {
                                    "value": "2.5",
                                    "label": "2.5 Generic"
                                 },
                                 {
                                    "value": "2.0",
                                    "label": "2.0 Generic"
                                 },
                                 {
                                    "value": "1.0",
                                    "label": "1.0 Generic"
                                 }
                              ]
                           },
                           {
                              "value": "CC BY-ND",
                              "label": "Attribution-NoDerivs (CC BY-ND)",
                              "versions": [
                                 {
                                    "value": "4.0",
                                    "label": "4.0 International"
                                 },
                                 {
                                    "value": "3.0",
                                    "label": "3.0 Unported"
                                 },
                                 {
                                    "value": "2.5",
                                    "label": "2.5 Generic"
                                 },
                                 {
                                    "value": "2.0",
                                    "label": "2.0 Generic"
                                 },
                                 {
                                    "value": "1.0",
                                    "label": "1.0 Generic"
                                 }
                              ]
                           },
                           {
                              "value": "CC BY-NC",
                              "label": "Attribution-NonCommercial (CC BY-NC)",
                              "versions": [
                                 {
                                    "value": "4.0",
                                    "label": "4.0 International"
                                 },
                                 {
                                    "value": "3.0",
                                    "label": "3.0 Unported"
                                 },
                                 {
                                    "value": "2.5",
                                    "label": "2.5 Generic"
                                 },
                                 {
                                    "value": "2.0",
                                    "label": "2.0 Generic"
                                 },
                                 {
                                    "value": "1.0",
                                    "label": "1.0 Generic"
                                 }
                              ]
                           },
                           {
                              "value": "CC BY-NC-SA",
                              "label": "Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)",
                              "versions": [
                                 {
                                    "value": "4.0",
                                    "label": "4.0 International"
                                 },
                                 {
                                    "value": "3.0",
                                    "label": "3.0 Unported"
                                 },
                                 {
                                    "value": "2.5",
                                    "label": "2.5 Generic"
                                 },
                                 {
                                    "value": "2.0",
                                    "label": "2.0 Generic"
                                 },
                                 {
                                    "value": "1.0",
                                    "label": "1.0 Generic"
                                 }
                              ]
                           },
                           {
                              "value": "CC BY-NC-ND",
                              "label": "Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)",
                              "versions": [
                                 {
                                    "value": "4.0",
                                    "label": "4.0 International"
                                 },
                                 {
                                    "value": "3.0",
                                    "label": "3.0 Unported"
                                 },
                                 {
                                    "value": "2.5",
                                    "label": "2.5 Generic"
                                 },
                                 {
                                    "value": "2.0",
                                    "label": "2.0 Generic"
                                 },
                                 {
                                    "value": "1.0",
                                    "label": "1.0 Generic"
                                 }
                              ]
                           },
                           {
                              "value": "CC0 1.0",
                              "label": "Public Domain Dedication (CC0)"
                           },
                           {
                              "value": "CC PDM",
                              "label": "Public Domain Mark (PDM)"
                           }
                        ]
                     },
                     {
                        "value": "GNU GPL",
                        "label": "General Public License v3"
                     },
                     {
                        "value": "PD",
                        "label": "Public Domain"
                     },
                     {
                        "value": "ODC PDDL",
                        "label": "Public Domain Dedication and Licence"
                     },
                     {
                        "value": "C",
                        "label": "Copyright"
                     }
                  ]
               },
               {
                  "name": "licenseVersion",
                  "type": "select",
                  "label": "License Version",
                  "options": [
                     {
                        "value": "4.0",
                        "label": "4.0 International"
                     },
                     {
                        "value": "3.0",
                        "label": "3.0 Unported"
                     },
                     {
                        "value": "2.5",
                        "label": "2.5 Generic"
                     },
                     {
                        "value": "2.0",
                        "label": "2.0 Generic"
                     },
                     {
                        "value": "1.0",
                        "label": "1.0 Generic"
                     }
                  ],
                  "optional": true
               },
               {
                  "name": "yearFrom",
                  "type": "number",
                  "label": "Years (from)",
                  "placeholder": "1991",
                  "min": "-9999",
                  "max": "9999",
                  "optional": true
               },
               {
                  "name": "yearTo",
                  "type": "number",
                  "label": "Years (to)",
                  "placeholder": "1992",
                  "min": "-9999",
                  "max": "9999",
                  "optional": true
               },
               {
                  "name": "source",
                  "type": "text",
                  "label": "Source",
                  "placeholder": "https://",
                  "optional": true
               },
               {
                  "name": "authors",
                  "type": "list",
                  "field": {
                     "name": "author",
                     "type": "group",
                     "fields": [
                        {
                           "label": "Author's name",
                           "name": "name",
                           "optional": true,
                           "type": "text"
                        },
                        {
                           "name": "role",
                           "type": "select",
                           "label": "Author's role",
                           "default": "Author",
                           "options": [
                              {
                                 "value": "Author",
                                 "label": "Author"
                              },
                              {
                                 "value": "Editor",
                                 "label": "Editor"
                              },
                              {
                                 "value": "Licensee",
                                 "label": "Licensee"
                              },
                              {
                                 "value": "Originator",
                                 "label": "Originator"
                              }
                           ]
                        }
                     ]
                  }
               },
               {
                  "name": "licenseExtras",
                  "type": "text",
                  "widget": "textarea",
                  "label": "License Extras",
                  "optional": true,
                  "description": "Any additional information about the license"
               },
               {
                  "name": "changes",
                  "type": "list",
                  "field": {
                     "name": "change",
                     "type": "group",
                     "label": "Changelog",
                     "fields": [
                        {
                           "name": "date",
                           "type": "text",
                           "label": "Date",
                           "optional": true
                        },
                        {
                           "name": "author",
                           "type": "text",
                           "label": "Changed by",
                           "optional": true
                        },
                        {
                           "name": "log",
                           "type": "text",
                           "widget": "textarea",
                           "label": "Description of change",
                           "placeholder": "Photo cropped, text changed, etc.",
                           "optional": true
                        }
                     ]
                  }
               },
               {
                  "name": "authorComments",
                  "type": "text",
                  "widget": "textarea",
                  "label": "Author comments",
                  "description": "Comments for the editor of the content (This text will not be published as a part of copyright info)",
                  "optional": true
               },
               {
                  "name": "contentType",
                  "type": "text",
                  "widget": "none"
               },
               {
                  "name": "defaultLanguage",
                  "type": "text",
                  "widget": "none"
               }
            ],
            "assets": {
               "css": [
                  "/h5p/laravel-h5p/css/laravel-h5p.css",
                  "/h5p/h5p-core/styles/h5p.css",
                  "/h5p/h5p-core/styles/h5p-confirmation-dialog.css",
                  "/h5p/h5p-core/styles/h5p-core-button.css",
                  "/h5p/h5p-editor/libs/darkroom.css",
                  "/h5p/h5p-editor/styles/css/h5p-hub-client.css",
                  "/h5p/h5p-editor/styles/css/fonts.css",
                  "/h5p/h5p-editor/styles/css/application.css",
                  "/h5p/h5p-editor/styles/css/libs/zebra_datepicker.min.css"
               ],
               "js": [
                  "/h5p/h5p-core/js/jquery.js",
                  "/h5p/h5p-core/js/h5p.js",
                  "/h5p/h5p-core/js/h5p-event-dispatcher.js",
                  "/h5p/h5p-core/js/h5p-x-api-event.js",
                  "/h5p/h5p-core/js/h5p-x-api.js",
                  "/h5p/h5p-core/js/h5p-content-type.js",
                  "/h5p/h5p-core/js/h5p-confirmation-dialog.js",
                  "/h5p/h5p-core/js/h5p-action-bar.js",
                  "/h5p/h5p-core/js/request-queue.js",
                  "/h5p/h5p-editor/scripts/h5peditor-editor.js",
                  // "/h5p/laravel-h5p/js/laravel-h5p.js",
                  "/h5p/laravel-h5p/js/laravel-h5p-editor.js",
                  "/h5p/h5p-editor/scripts/h5p-hub-client.js",
                  "/h5p/h5p-editor/scripts/h5peditor.js",
                  "/h5p/h5p-editor/scripts/h5peditor-semantic-structure.js",
                  "/h5p/h5p-editor/scripts/h5peditor-library-selector.js",
                  "/h5p/h5p-editor/scripts/h5peditor-fullscreen-bar.js",
                  "/h5p/h5p-editor/scripts/h5peditor-form.js",
                  "/h5p/h5p-editor/scripts/h5peditor-text.js",
                  "/h5p/h5p-editor/scripts/h5peditor-html.js",
                  "/h5p/h5p-editor/scripts/h5peditor-number.js",
                  "/h5p/h5p-editor/scripts/h5peditor-textarea.js",
                  "/h5p/h5p-editor/scripts/h5peditor-file-uploader.js",
                  "/h5p/h5p-editor/scripts/h5peditor-file.js",
                  "/h5p/h5p-editor/scripts/h5peditor-image.js",
                  "/h5p/h5p-editor/scripts/h5peditor-image-popup.js",
                  "/h5p/h5p-editor/scripts/h5peditor-av.js",
                  "/h5p/h5p-editor/scripts/h5peditor-group.js",
                  "/h5p/h5p-editor/scripts/h5peditor-boolean.js",
                  "/h5p/h5p-editor/scripts/h5peditor-list.js",
                  "/h5p/h5p-editor/scripts/h5peditor-list-editor.js",
                  "/h5p/h5p-editor/scripts/h5peditor-library.js",
                  "/h5p/h5p-editor/scripts/h5peditor-library-list-cache.js",
                  "/h5p/h5p-editor/scripts/h5peditor-select.js",
                  "/h5p/h5p-editor/scripts/h5peditor-selector-hub.js",
                  "/h5p/h5p-editor/scripts/h5peditor-selector-legacy.js",
                  "/h5p/h5p-editor/scripts/h5peditor-dimensions.js",
                  "/h5p/h5p-editor/scripts/h5peditor-coordinates.js",
                  "/h5p/h5p-editor/scripts/h5peditor-none.js",
                  "/h5p/h5p-editor/scripts/h5peditor-metadata.js",
                  "/h5p/h5p-editor/scripts/h5peditor-metadata-author-widget.js",
                  "/h5p/h5p-editor/scripts/h5peditor-metadata-changelog-widget.js",
                  "/h5p/h5p-editor/scripts/h5peditor-pre-save.js",
                  "/h5p/h5p-editor/ckeditor/ckeditor.js",
                  "/h5p/h5p-editor/language/en.js"
               ]
            },
            "deleteMessage": "laravel-h5p.content.destoryed",
            "apiVersion": {
               "majorVersion": 1,
               "minorVersion": 24
            }
         },
         "loadedJs": [

         ],
         "loadedCss": [

         ],
         "core": {
            "styles": [
               "/h5p/laravel-h5p/css/laravel-h5p.css",
               "/h5p/h5p-core/styles/h5p.css",
               "/h5p/h5p-core/styles/h5p-confirmation-dialog.css",
               "/h5p/h5p-core/styles/h5p-core-button.css"
            ],
            "scripts": [
               "/h5p/h5p-core/js/jquery.js",
               "/h5p/h5p-core/js/h5p.js",
               "/h5p/h5p-core/js/h5p-event-dispatcher.js",
               "/h5p/h5p-core/js/h5p-x-api-event.js",
               "/h5p/h5p-core/js/h5p-x-api.js",
               "/h5p/h5p-core/js/h5p-content-type.js",
               "/h5p/h5p-core/js/h5p-confirmation-dialog.js",
               "/h5p/h5p-core/js/h5p-action-bar.js",
               "/h5p/h5p-core/js/request-queue.js",
               "/h5p/h5p-editor/scripts/h5peditor-editor.js"
               // "/h5p/laravel-h5p/js/laravel-h5p.js"
            ]
         }
      };

      let scripts = [
         // { src: "/h5p/core/js/jquery.js" },
         // { src: "/h5p/core/js/h5p.js" },

         // { src: "/h5p/core/js/h5p-event-dispatcher.js"} ,
         // { src: "/h5p/core/js/h5p-x-api-event.js"} ,
         // { src: "/h5p/core/js/h5p-x-api.js"} ,
         // { src: "/h5p/core/js/h5p-content-type.js"} ,
         // { src: "/h5p/core/js/h5p-confirmation-dialog.js"} ,
         // { src: "/h5p/core/js/h5p-action-bar.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-editor.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor.js"} ,
         // { src: "/h5p/editor/language/en.js"} ,
         // { src: "/h5p/editor/scripts/h5p-hub-client.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-semantic-structure.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-library-selector.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-form.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-text.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-html.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-number.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-textarea.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-file-uploader.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-file.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-image.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-image-popup.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-av.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-group.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-boolean.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-list.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-list-editor.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-library.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-library-list-cache.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-select.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-selector-hub.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-selector-legacy.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-dimensions.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-coordinates.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-none.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-metadata.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-metadata-author-widget.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-metadata-changelog-widget.js"} ,
         // { src: "/h5p/editor/scripts/h5peditor-pre-save.js"} ,
         // { src: "/h5p/editor/ckeditor/ckeditor.js"}
      ]
      //Append the script element on each iteration
      // scripts.map(item => { 
      //     const script = document.createElement("script")
      //     script.src = item.src
      //     script.async = true
      //     // script.onload = () => ;
      //     document.body.appendChild(script)
      // }) ;

      // scripts.map(item => { 
      var script = document.createElement("script");
      script.src = "/h5p/h5p-core/js/jquery.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-core/js/h5p.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-core/js/h5p-event-dispatcher.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-core/js/h5p-x-api-event.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-core/js/h5p-x-api.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-core/js/h5p-content-type.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-core/js/h5p-confirmation-dialog.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-core/js/h5p-action-bar.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-core/js/request-queue.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-editor.js";
      script.async = false;
      document.body.appendChild(script);

      //   var script = document.createElement("script");
      //   script.src = "/h5p/laravel-h5p/js/laravel-h5p.js";
      //   script.async = false;
      //   document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/laravel-h5p/js/laravel-h5p-editor.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5p-hub-client.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-semantic-structure.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-library-selector.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-fullscreen-bar.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-form.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-text.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-html.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-number.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-textarea.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-file-uploader.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-file.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-image.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-image-popup.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-av.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-group.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-boolean.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-list.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-list-editor.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-library.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-library-list-cache.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-select.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-selector-hub.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-selector-legacy.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-dimensions.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-coordinates.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-none.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-metadata.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-metadata-author-widget.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-metadata-changelog-widget.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/scripts/h5peditor-pre-save.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/ckeditor/ckeditor.js";
      script.async = false;
      document.body.appendChild(script);

      var script = document.createElement("script");
      script.src = "/h5p/h5p-editor/language/en.js";
      script.async = false;
      document.body.appendChild(script);







      // }) ;
      script.onload = () => this.scriptLoaded();

   }

   scriptLoaded() {

      // console.log(window.H5P);

      var ns = window.H5PEditor;

      (function ($) {
         window.H5PEditor.init = function () {


            window.H5PEditor.$ = window.H5P.jQuery;
            window.H5PEditor.basePath = window.H5PIntegration.editor.libraryUrl;
            window.H5PEditor.fileIcon = window.H5PIntegration.editor.fileIcon;
            window.H5PEditor.ajaxPath = window.H5PIntegration.editor.ajaxPath;
            window.H5PEditor.filesPath = window.H5PIntegration.editor.filesPath;
            window.H5PEditor.apiVersion = window.H5PIntegration.editor.apiVersion;
            window.H5PEditor.contentLanguage = window.H5PIntegration.editor.language;

            // Semantics describing what copyright information can be stored for media.
            window.H5PEditor.copyrightSemantics = window.H5PIntegration.editor.copyrightSemantics;
            window.H5PEditor.metadataSemantics = window.H5PIntegration.editor.metadataSemantics;

            // Required styles and scripts for the editor
            window.H5PEditor.assets = window.H5PIntegration.editor.assets;

            // Required for assets
            window.H5PEditor.baseUrl = '';

            if (window.H5PIntegration.editor.nodeVersionId !== undefined) {
               window.H5PEditor.contentId = window.H5PIntegration.editor.nodeVersionId;
            }

            var h5peditor;
            var $upload = $('.laravel-h5p-upload').parents('.laravel-h5p-upload-container');
            var $editor = $('#laravel-h5p-editor');
            var $create = $('#laravel-h5p-create').hide();
            var $type = $('.laravel-h5p-type');
            var $params = $('#laravel-h5p-parameters');
            var $library = $('#laravel-h5p-library');
            var library = $library.val();

            $type.change(function () {
               if ($type.filter(':checked').val() === 'upload') {
                  $create.hide();
                  $upload.show();
               }
               else {
                  $upload.hide();
                  if (h5peditor === undefined) {
                     window.h5peditorCopy = h5peditor = new ns.Editor(library, $params.val(), $editor[0]);
                  }
                  $create.show();
               }
            });

            if ($type.filter(':checked').val() === 'upload') {
               $type.change();
            }
            else {
               $type.filter('input[value="create"]').attr('checked', true).change();
            }

            let formIsUpdated = false;
            const $form = $('#laravel-h5p-form').submit(function (event) {
               if ($type.length && $type.filter(':checked').val() === 'upload') {
                  return; // Old file upload
               }

               if (h5peditor !== undefined && !formIsUpdated) {







                  // <-- new code -->

                  //    console.log(h5peditor.getLibrary());
                  //   console.log(h5peditor.getParams());

                  //   $.ajax({
                  //           url:global.config.h5pAjaxUrl+"/api/api/h5p/?api_token=test",
                  //           data: JSON.stringify({
                  //               library: h5peditor.getLibrary(),
                  //               parameters: JSON.stringify(h5peditor.getParams()),
                  //               action: 'create'
                  //           }),
                  //           headers: {
                  //               'Content-Type': 'application/json'
                  //           },
                  //           type: 'POST'
                  //       }).then((result) => {
                  //         console.log(result);
                  //         return false;
                  //           // const parsedResult = JSON.parse(result)
                  //           // if(parsedResult.contentId) {
                  //           //     window.location.href = 'http://localhost:8080/h5p/play/' + parsedResult.contentId;
                  //           // }
                  //       });

                  //   return false;
                  // <--/ new code -->






                  // Get content from editor
                  //   h5peditor.getContent(function (content) {

                  //     // Set main library
                  //     $library.val(content.library);

                  //     // Set params
                  //     $params.val(content.params);

                  //     // Submit form data
                  //     formIsUpdated = true;
                  //     $form.submit();
                  //   });

                  // Stop default submit
                  event.preventDefault();
               }
            });

            // Title label
            var $title = $('#laravel-h5p-title');
            var $label = $title.prev();
            $title.focus(function () {
               $label.addClass('screen-reader-text');
            }).blur(function () {
               if ($title.val() === '') {
                  $label.removeClass('screen-reader-text');
               }
            }).focus();

            // Delete confirm
            $('#laravel-h5p-destory').click(function () {
               return window.confirm(window.H5PIntegration.editor.deleteMessage);
            });

         };

         window.H5PEditor.getAjaxUrl = function (action, parameters) {

            var url = window.H5PIntegration.editor.ajaxPath + action + '/?';

            if (parameters !== undefined) {
               for (var property in parameters) {
                  if (parameters.hasOwnProperty(property)) {
                     url += '&' + property + '=' + parameters[property];
                  }
               }
            }

            return url;
         };

         $(document).ready(window.H5PEditor.init);
         //   window.H5P.jQuery("iframe").contents().find(".h5peditor>select").css({"display":"none"});
      })(window.H5P.jQuery);
   }

   handleH5PSubmit() {
      console.log(window.h5peditorCopy);


      


     const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'JWT fefege...'
    }
    const data = {
      library: window.h5peditorCopy.getLibrary(),
      parameters: JSON.stringify(window.h5peditorCopy.getParams()),
      action: 'create'
    }
    axios.post(global.config.h5pAjaxUrl+'/api/api/h5p/?api_token=test', data, {
        headers: headers
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
      // $.ajax({
      //    url: global.config.h5pAjaxUrl+"/api/api/h5p/?api_token=test",
      //    data: JSON.stringify({
      //       library: h5peditor.getLibrary(),
      //       parameters: JSON.stringify(h5peditor.getParams()),
      //       action: 'create'
      //    }),
      //    headers: {
      //       'Content-Type': 'application/json'
      //    },
      //    type: 'POST'
      // }).then((result) => {
      //    console.log(result);
      //    return false;
      //    // const parsedResult = JSON.parse(result)
      //    // if(parsedResult.contentId) {
      //    //     window.location.href = 'http://localhost:8080/h5p/play/' + parsedResult.contentId;
      //    // }
      // });

      return false;
      alert();
      return false;
   }
   render() {
      return (
         <div>
            <form method="POST" action={global.config.h5pAjaxUrl+"/api/h5p"} accept-charset="UTF-8" className="form-horizontal"  /*enctype="multipart/form-data"*/ id="laravel-h5p-form">
               <input name="_token" type="hidden" value="B6TFsmFD5TLZaWCAYZ91ly0D2We0xjLAtRmBJzQT" />
               <input type="hidden" name="library" id="laravel-h5p-library" value={this.h5pLib} />
               <input type="hidden" name="parameters" id="laravel-h5p-parameters" value="{&quot;params&quot;:{},&quot;metadata&quot;:{}}" />

               <fieldset>

                  <div id="laravel-h5p-create" className="form-group ">
                     <label for="inputParameters" className="control-label col-md-3">&nbsp;</label>
                     <div className="col-md-9">
                        <div>
                           <div id="laravel-h5p-editor">Loading...</div>
                        </div>


                     </div>
                  </div>



                  <div className="form-group laravel-h5p-upload-container">
                     <label for="inputUpload" className="control-label col-md-3">Upload</label>
                     <div className="col-md-9">
                        <input type="file" name="h5p_file" id="h5p-file" className="laravel-h5p-upload form-control" />
                        <small className="h5p-disable-file-check helper-block">
                           <label className="">
                              <input type="checkbox" name="h5p_disable_file_check" id="h5p-disable-file-check" /> Disable file extension check
                            </label>
                        </small>

                     </div>
                  </div>

                  <div className="form-group ">
                     <label for="inputAction" className="control-label col-md-3">Method</label>
                     <div className="col-md-6">

                        <label className="radio-inline">
                           <input type="radio" name="action" value="upload" className="laravel-h5p-type" />Upload
                        </label>
                        <label className="radio-inline">
                           <input type="radio" name="action" value="create" className="laravel-h5p-type" checked="checked" />create
                        </label>


                     </div>
                  </div>




                  {/* <div className="form-group h5p-sidebar">
                    <label className="control-label col-md-3">Display Options</label>
                    <div className="col-md-9">

                        <div className="form-control-static">

                            <ul className="list-unstyled">

                                <li>
                                    <label>
                                        <input className="h5p-visibility-toggler" data-h5p-visibility-subject-selector=".h5p-action-bar-buttons-settings" id="laravel-h5p-title" value="1" checked="checked" name="frame" type="checkbox" />
                                        Toolbar Below Content
                                    </label>
                                </li>

                                                                <li>
                                    <label>
                                        <input className="h5p-visibility-toggler" data-h5p-visibility-subject-selector=".h5p-action-bar-buttons-settings" id="laravel-h5p-title" value="1" checked="checked" name="download" type="checkbox" />
                                        Display Download button
                                    </label>
                                </li>
                                
                                                                <li>
                                    <label>
                                        <input className="h5p-visibility-toggler" data-h5p-visibility-subject-selector=".h5p-action-bar-buttons-settings" id="laravel-h5p-title" value="1" checked="checked" name="embed" type="checkbox" />
                                        Display Embed button
                                    </label>
                                </li>
                                
                                                                <li>
                                    <label>
                                        <input className="h5p-visibility-toggler" data-h5p-visibility-subject-selector=".h5p-action-bar-buttons-settings" id="laravel-h5p-title" value="1" checked="checked" name="copyright" type="checkbox" />
                                        Display Copyright button
                                    </label>
                                </li>
                                
                            </ul>
                        </div>

                    </div>

                </div> */}


                  <div className="form-group">
                     <div className="col-md-9 col-md-offset-3">
                        <button type="submit" className="add-resource-submit-btn" onClick={() => this.props.handleCreateResourceSubmit(this.props.resource.currentPlaylistId, this.props.resource.editor, this.props.resource.editorType)}>Finish</button>
                        {/* <input className="btn btn-primary" data-loading-text="Saving..." type="submit" value="Save" /> */}

                     </div>

                  </div>


               </fieldset>

            </form>
         </div>
      );
   }

}




const mapDispatchToProps = dispatch => ({
   
});

const mapStateToProps = (state) => {
   return {
      resource: state.resource
   };
}




export default withRouter(connect(mapStateToProps,
   mapDispatchToProps)(EditorPage))