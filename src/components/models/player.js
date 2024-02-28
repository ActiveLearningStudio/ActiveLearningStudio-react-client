/* eslint-disable */

import React, { useEffect, useState, useRef } from "react";

// import { Link, useSearchParams } from "react-router-dom";

import { ReactReader, ReactReaderStyle } from "react-reader";
import JSZip from "jszip";
import Modal from "react-bootstrap/Modal";
import LeftArrow from "../../assets/images/svg/arrow.svg";

const ownStyles = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: "#fff",
    background: "#084892",
    zIndex: 1111,
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: "#fff",
    background: "#084892",
  },
};

const tokenDummy =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybVVybCI6Imh0dHBzOi8vY2FudmFzLmluc3RydWN0dXJlLmNvbSIsImNsaWVudElkIjoiMjA4ODMwMDAwMDAwMDAwMTM4IiwiZGVwbG95bWVudElkIjoiMTgwOmE1MTJjY2Y0ZGE4NTFlMzA1MjZmYTJlZWEyZjEyN2I1YjA0MmQ1N2QiLCJwbGF0Zm9ybUNvZGUiOiJsdGlhSFIwY0hNNkx5OWpZVzUyWVhNdWFXNXpkSEoxWTNSMWNtVXVZMjl0TWpBNE9ETXdNREF3TURBd01EQXdNVE00TVRnd09tRTFNVEpqWTJZMFpHRTROVEZsTXpBMU1qWm1ZVEpsWldFeVpqRXlOMkkxWWpBME1tUTFOMlElM0QiLCJjb250ZXh0SWQiOiJodHRwcyUzQSUyRiUyRmNhbnZhcy5pbnN0cnVjdHVyZS5jb20yMDg4MzAwMDAwMDAwMDAxMzgxODAlM0FhNTEyY2NmNGRhODUxZTMwNTI2ZmEyZWVhMmYxMjdiNWIwNDJkNTdkYTE2NGM4YTMzYzljZmNjODQxM2I4YjA5ZWQ5N2E3MjU0MDhiMDI2OV9ORiIsInVzZXIiOiJjZmZkZTQ2ZC04NjlmLTQzMmEtODVkNC1jNmFmZDVhZmE5MmIiLCJzIjoiZWRjOWUwNjY1NDMxMTdiMzU0NzhhN2JhMWYwYmI2ZmFkYjE4NTgzNGJkZjhmNDJlY2QiLCJpYXQiOjE3MDQ4ODc1NjZ9.AYhjI5axoZlWnQJkhG2gXJyjgF5Cg2NjxhAwtZL0ZAM";

const Epub = ({ previewId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {});
  const [activeC2E, setActiveC2e] = useState(false);
  const [c2eResource, setC2eResource] = useState(null);
  const [JSlipParser, setJSlipParser] = useState(null);
  const [allFiles, setAllFIles] = useState(null);
  const [epbFile, setEpbFile] = useState(null);
  const [lmsUserInfo, setUserLMS] = useState(null);
  // And your own state logic to persist state
  const [location, setLocation] = useState(null);
  const renditionRef = useRef(null);
  const tocRef = useRef(null);

  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    if (renditionRef.current && tocRef.current) {
      setLocation(epubcifi);
    }
  };
  // detect id

  // const [searchParams] = useSearchParams();
  // const param1 = searchParams.get("c2eId");
  // const param2 = searchParams.get("ltik");
  // const preview = searchParams.get("preview");

  useEffect(() => {
    if (previewId) {
      getC2E(previewId);
    }
  }, [previewId]);

  const getC2E = async (ceeId) => {
    const userInfo = await fetch(
      process.env.REACT_APP_API_DOMAIN_URL +
        process.env.REACT_APP_INFO_URL,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenDummy}`,
        },
      }
    );
    const result = await userInfo.json();
    setUserLMS(result);
    fetch(
      `${
        process.env.REACT_APP_API_DOMAIN_URL +
        process.env.REACT_APP_STREAM_URL
      }?ceeId=${ceeId}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenDummy}`,
        },
      }
    ).then((response) => {
      response.arrayBuffer().then(async (data) => {
        const blob = new Blob([data], {
          type: "application/octet-stream",
        });
        try {
          const loadzip = await JSZip.loadAsync(blob);

          loadzip.forEach(async (relativePath, zipEntry) => {
            if (zipEntry.name.includes(".html")) {
              setJSlipParser(loadzip);
            } else if (zipEntry.name.includes(".c2e")) {
              const loadzip1 = await JSZip.loadAsync(
                zipEntry.async("blob")
              );
              setJSlipParser(loadzip1);
            }
          });
        } catch (e) {
          //    setError(true);
        }
      });
    });
  };

  useEffect(() => {
    if (JSlipParser) {
      const contents = [];

      JSlipParser.forEach((relativePath, zipEntry) => {
        contents.push(zipEntry.name);
      });

      setAllFIles(contents);
    }
  }, [JSlipParser]);

  useEffect(() => {
    if (activeC2E) {
      setTimeout(() => {
        document
          .getElementById("copyrightNotice")
          ?.addEventListener("click", () => {
            handleShow();
          });
      }, 1000);
    }
  }, [activeC2E]);

  useEffect(() => {
    (async () => {
      if (allFiles) {
        const c2edata = await returnContentFromUrl("c2e.json");

        setActiveC2e(c2edata);
        const result = await returnContentFromUrl(
          "content/contents.json"
        );

        if (result) {
          const AllEpub = result?.c2eContents.filter(
            (data) => data.learningResourceType === "EPUB"
          )?.[0];
          if (AllEpub) {
            const AllEpubData = await returnContentFromUrl(
              AllEpub.url.charAt(0) === "/"
                ? AllEpub?.url.substr(1, AllEpub?.url.length - 1)
                : AllEpub?.url
            );

            const AllEpubData1 = await ExtractFromFile(
              AllEpubData.file.charAt(0) === "/"
                ? AllEpubData?.file.substr(
                    1,
                    AllEpubData?.file.length - 1
                  )
                : AllEpubData?.file
            );

            const epubData = await AllEpubData1.async("uint8array");
            const resoruces = c2edata?.c2eContainer?.filter(
              (x) => x["@id"] === "c2ens:c2eResources"
            );
            const resoruce =
              Array.isArray(resoruces) && resoruces.length > 0
                ? resoruces[0]?.c2eResources.find((r) =>
                    AllEpubData1.unsafeOriginalName?.includes(r.url)
                  )
                : null;
            setC2eResource(resoruce);

            setEpbFile(epubData);
          }
        }
      }
    })();
  }, [allFiles]);

  const returnContentFromUrl = async (url) => {
    for (let i = 0; i < allFiles.length; i++) {
      if (allFiles[i].includes(url)) {
        const contentRead = await JSlipParser.files[
          allFiles[i]
        ].async("text");

        const data = JSON.parse(contentRead);

        return data;
      }
    }
  };

  const ExtractFromFile = async (url) => {
    for (let i = 0; i < allFiles.length; i++) {
      if (allFiles[i].includes(url)) {
        const data = await JSlipParser.files[allFiles[i]];

        return data;
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "20px", padding: "30px " }}>
        <div
          id="reader-container"
          style={{ height: "100vh", width: "100%" }}
        >
          <ReactReader
            epubOptions={{
              allowScriptedContent: true, // Adds `allow-scripts` to sandbox-attribute
              flow: "scrolled",
              manager: "continuous",
            }}
            location={location}
            locationChanged={locationChanged}
            tocChanged={(toc) => (tocRef.current = toc)}
            url={epbFile}
            showToc
            readerStyles={ownStyles}
            getRendition={(rendition) => {
              renditionRef.current = rendition;
              rendition.hooks.content.register(async (contents) => {
                const scriptEle = contents.document.createElement(
                  "script"
                );
                scriptEle.type = "text/javascript";
                scriptEle.async = true;
                scriptEle.src = `${window.location.origin}/tincan.js`;

                scriptEle.addEventListener("load", (ev) => {
                  const c2eIdSplit = activeC2E["@id"].split(":");
                  const c2eId =
                    Array.isArray(c2eIdSplit) && c2eIdSplit.length > 1
                      ? c2eIdSplit[1]
                      : "NIL";
                  const licensee =
                    activeC2E?.c2eMetadata?.copyright?.license
                      ?.licensee;
                  console.log("c2eResource >>", c2eResource);
                  console.log("activeC2E >>", activeC2E);
                  console.log("c2eId >>", c2eId);
                  console.log("licensee >>", licensee);
                  console.log("licensee.name >>", licensee.name);
                  console.log("licensee.email >>", licensee.email);
                  console.log("user lms >>", licensee.email);
                  const tincan = new contents.window.TinCan({
                    recordStores: [
                      {
                        endpoint:
                          "https://c2e-player-service.curriki.org/xapi",
                        username:
                          "9491dfe3-fd45-4bb8-b9d5-3480bcddd780",
                        password:
                          "8a290a3a-ff9b-4d5c-a4e9-96550d85b393",
                        allowFail: false,
                        headers: {
                          Authorization: `Bearer ${tokenDummy}`,
                        },
                      },
                    ],
                  });

                  if ("atStart" in renditionRef.current.location) {
                    const statement = {
                      actor: {
                        mbox: licensee.email,
                        name: licensee.email,
                      },
                      verb: {
                        id:
                          "http://activitystrea.ms/schema/1.0/consume",
                        display: {
                          "en-US": "consumed",
                        },
                      },
                      context: {},
                      object: {
                        id: `https://c2e.curriki.org/${c2eId}`,
                        definition: {
                          name: {
                            "en-US":
                              activeC2E?.c2eMetadata?.general?.title,
                          },
                          extensions: {},
                        },
                      },
                    };

                    const c2eResourceXapi = {
                      "@id": c2eResource?.["@id"].replace(
                        "c2ens:",
                        "https://c2e.curriki.org/"
                      ),
                      "@type": "https://schema.org/DigitalDocument",
                      "https://schema.org/identifier": {
                        "@type": "https://schema.org/PropertyValue",
                        "https://schema.org/propertyID":
                          c2eResource?.identifier.propertyID,
                        "https://schema.org/value":
                          c2eResource?.identifier.value,
                      },
                      "https://schema.org/fileFormat":
                        c2eResource?.fileFormate,
                      "https://schema.org/url": c2eResource?.url,
                    };
                    statement.object.definition.extensions[
                      "https://c2e.curriki.org/xAPI/c2eResource"
                    ] = c2eResourceXapi;

                    if ("subjectOf" in activeC2E?.c2eMetadata) {
                      const c2eSubjectOfXapi = {
                        ...JSON.parse(
                          JSON.stringify(
                            activeC2E?.c2eMetadata?.subjectOf
                          )
                            .replaceAll(
                              "c2ens:",
                              "https://c2e.curriki.org/"
                            )
                            .replaceAll(
                              "sdons:",
                              "https://schema.org/"
                            )
                        ),
                      };
                      statement.object.definition.extensions[
                        "https://c2e.curriki.org/xAPI/c2eSubjectOf"
                      ] = c2eSubjectOfXapi;

                      statement.object.definition.extensions[
                        "https://c2e.curriki.org/xAPI/c2eSPlayerInfo"
                      ] = {
                        playerClient: lmsUserInfo.token.platformInfo,
                        roles: lmsUserInfo.context.roles,
                        playerServiceEndpoint:
                          lmsUserInfo.context.targetLinkUri,
                      };
                    }

                    tincan.sendStatement(statement);
                  }
                });

                scriptEle.addEventListener("error", (ev) => {
                  console.log({
                    status: false,
                    message: "Failed to load the script ＄{FILE_URL}",
                  });
                });
                contents.document.body.appendChild(scriptEle);
              });
            }}
          />
        </div>
      </div>
      {activeC2E && (
        <div className="footer-copyright">
          {/* From {activeC2E?.c2eMetadata?.subjectOf?.name},{" "}
          <span onClick={handleShow}>Copyright Notice</span>. Used by permission
          of John Wiley & Sons, Inc.
          {activeC2E?.c2eMetadata?.copyright?.copyrightFooter} */}
          <div
            dangerouslySetInnerHTML={{
              __html:
                activeC2E?.c2eMetadata?.copyright?.copyrightFooter,
            }}
          />
        </div>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Copyright Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="copyright-data">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  activeC2E?.c2eMetadata?.copyright?.copyrightNotice,
              }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Epub;
