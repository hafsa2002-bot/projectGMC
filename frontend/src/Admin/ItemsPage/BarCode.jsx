import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeSupportedFormats, Html5Qrcode } from "html5-qrcode";
import { ScanBarcode, X } from "lucide-react";
import axios from "axios";

function BarCode({setBarcode, setProductName}) {
    const [scannedCode, setScannedCode] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [shouldStart, setShouldStart] = useState(false);
    const [cameraInitializing, setCameraInitializing] = useState(true);
    const readerRef = useRef(null);
    const html5QrCodeRef = useRef(null);

    useEffect(() => {
        const warmUpCamera = async () => {
        const warmupElementId = "reader_warmup";
        const html5QrCode = new Html5Qrcode(warmupElementId);
    
        try {
            await html5QrCode.start(
                { facingMode: "environment" },
                // { fps: 5, qrbox: { width: 200, height: 200 } },
                { fps: 5, qrbox: { width: 100, height: 100 } },
                () => {},
                () => {}
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await html5QrCode.stop();
        } catch (error) {
            console.warn("Warm-up failed:", error);
        } finally {
            const el = document.getElementById(warmupElementId);
            if (el) el.innerHTML = "";
            setCameraInitializing(false);
        }
        };
        warmUpCamera();
    }, []);

    useEffect(() => {
        if (shouldStart && readerRef.current) {
            if (!html5QrCodeRef.current) {
                html5QrCodeRef.current = new Html5Qrcode("reader_2");
            }
    
        const config = {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            formatsToSupport: [
                Html5QrcodeSupportedFormats.EAN_13,
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.UPC_A,
                Html5QrcodeSupportedFormats.UPC_E,
            ],
        };
        /*
        html5QrCodeRef.current
            .start(
                // { facingMode: "environment" },
                // { deviceId: { exact: "4ac1ae70f7bfd23141d860e8be03e6cdf9eda0cd5a4251c932bc441094e96d5a" } },
                // { deviceId: { exact: "1789331f4a057afd6e7bdcbf561d2ed539016c5effafdbdb7a528c87812ef21a" } },
                // { deviceId: { exact: "e546ec0c1fb4da69393e08e0cb036bed6ceeeab1fe2da10452de9ea76d7228b6" } },
                { deviceId: { exact: "08adca2c207a64d5e05661a016431fe5413466cc87f6dc741a3ff208e5276928" } },
                config,
                (decodedText) => {
                    html5QrCodeRef.current.stop().then(() => {
                    setScannedCode(decodedText);
                    setBarcode(decodedText)
                    fetchProductInfo(decodedText);
                    // setProductName(productInfo?.product_name ||
                    //     productInfo?.ecoscore_data?.agribalyse?.name_fr ||
                    //     " "
                    // )
                    setScanning(false);
                    setShouldStart(false);
                    });
                },
                (errorMessage) => {
                    if (!errorMessage.includes("NotFoundException")) {
                    console.warn("Scanning error:", errorMessage);
                    }
                }
            )
            .then(() => {
                const videoElement = document.querySelector("#reader_2 video");
                if (videoElement) {
                    videoElement.style.transform = "scaleX(1)";
                }
            })
            .catch((err) => {
                console.error("Camera error:", err);
                setScanning(false);
                setShouldStart(false);
            });
            */
            Html5Qrcode.getCameras().then((devices) => {
                const droidCam = devices.find((device) =>
                    device.label.toLowerCase().includes("droidcam")
                );
              
                if (!droidCam) {
                  alert("DroidCam not found.");
                  setScanning(false);
                  setShouldStart(false);
                  return;
                }
              
                html5QrCodeRef.current
                  .start(
                    { deviceId: { exact: droidCam.id } },
                    config,
                    (decodedText) => {
                      html5QrCodeRef.current.stop().then(() => {
                        setScannedCode(decodedText);
                        setBarcode(decodedText);
                        fetchProductInfo(decodedText);
                        setScanning(false);
                        setShouldStart(false);
                      });
                    },
                    (errorMessage) => {
                      if (!errorMessage.includes("NotFoundException")) {
                        console.warn("Scanning error:", errorMessage);
                      }
                    }
                  )
                  .then(() => {
                    const videoElement = document.querySelector("#reader_2 video");
                    if (videoElement) {
                      videoElement.style.transform = "scaleX(1)";
                    }
                  })
                  .catch((err) => {
                    console.error("Camera error:", err);
                    setScanning(false);
                    setShouldStart(false);
                  });
              });
              
        }
    }, [shouldStart]);


    const startScanner = () => {
        if (scanning || cameraInitializing) return;
        setScannedCode(null);
        setProductInfo(null);
        setScanning(true);
        setShouldStart(true);
    };

    const fetchProductInfo = (barcode) => {
        axios.get(`https://world.openfoodfacts.org/api/v3/product/${barcode}`)
            .then((response) => {
                // setProductInfo(response.data.product);
                const product = response.data.product;
                setProductInfo(product);
                setProductName(
                    product?.product_name ||
                    product?.ecoscore_data?.agribalyse?.name_fr ||
                    " "
                );
            })
            .catch((error) =>
                console.log("Failed to get data from Open Food API:", error)
            );
    };

    useEffect(() => {
        return () => {
            if (html5QrCodeRef.current?.isScanning) {
                html5QrCodeRef.current.stop().catch(() => {});
            }
        };
    }, []);

    Html5Qrcode.getCameras().then(devices => {
        console.log("devices: ", devices); // Logs all available cameras (including DroidCam)
    });

  return (
    <div className="relative flex flex-col items-center text-center">
        <div
            onClick={startScanner}
            disabled={cameraInitializing}
            className={`transition duration-300 ${
                cameraInitializing
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 "
            }`}
        >
            <ScanBarcode className="" size={32} />
        </div>
        <div id="reader_warmup" style={{ display: "none" }}></div>
        {cameraInitializing && (
            <p className=" w-28 absolute top-6 text-xs text-gray-800 mt-4 animate-pulse">⏳ Initializing camera...</p>
        )}

        {scanning && (
            <>
                <div className='bg-black  w-screen h-screen fixed z-50 top-0 right-0 flex justify-center items-center' style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                    <div className='bg-white flex flex-col rounded-lg p-6 gap-4 lg:w-4/12 w-9/12 mx-auto'>
                        <div className="px-3 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-start">Scan a Product</h2>
                            <div
                                onClick={async () => {
                                    if (html5QrCodeRef.current) {
                                        await html5QrCodeRef.current.stop();
                                    }
                                    setScanning(false);
                                    setShouldStart(false);
                                }}
                                className="text-gray-500 hover:text-red-600 ml-auto"
                            >
                                <X className=""/>
                            </div>
                        </div>
                        <div className="mt-4 w-full max-w-sm flex flex-col justify-center  mx-auto">
                            <div id="reader_2" ref={readerRef}></div>
                            <button
                                onClick={async () => {
                                if (html5QrCodeRef.current) {
                                    await html5QrCodeRef.current.stop();
                                    setScanning(false);
                                    setShouldStart(false);
                                }
                                }}
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
                            >
                                Stop Scanning
                            </button>
                        </div> 
                    </div>
                </div>
            </>
        )}

        {/* {scannedCode && (
            <p className="text-orange-600 font-semibold mt-4">
            ✅ Scanned Code: {scannedCode}
            </p>
        )} */}

        {/* {productInfo && (
            <div className="text-black mt-4 bg-gray-100 p-4 rounded shadow-sm w-full max-w-sm">
                <h2 className="font-bold text-lg mb-2">
                    {productInfo?.product_name ||
                    productInfo?.product_name_fr ||
                    productInfo?.ecoscore_data?.agribalyse?.name_fr ||
                    "Unnamed Product"}
                </h2>
                <p className="text-sm text-gray-700">Brand: {productInfo?.brands}</p>
                {productInfo.image_front_url && (
                    <img
                    src={productInfo.image_front_url}
                    alt="product"
                    className="w-32 mt-2 mx-auto rounded"
                    />
                )}
            </div>
        )} */}
    </div>
  )
}

export default BarCode
