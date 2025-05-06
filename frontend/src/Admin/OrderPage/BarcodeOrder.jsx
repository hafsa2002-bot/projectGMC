import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeSupportedFormats, Html5Qrcode } from "html5-qrcode";
import { ScanBarcode, X } from "lucide-react";
import axios from 'axios'

function BarcodeOrder({onBarcodeScanned}) {
    const [scannedCode, setScannedCode] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [shouldStart, setShouldStart] = useState(false);
    const [cameraInitializing, setCameraInitializing] = useState(true);
    const readerRef = useRef(null);
    const html5QrCodeRef = useRef(null);
    const videoRef = useRef(null);
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Warm up camera to avoid slow loading later
        const warmUpCamera = async () => {
        const warmupElementId = "reader_warmup";
        const html5QrCode = new Html5Qrcode(warmupElementId);
        try {
            await html5QrCode.start(
                { facingMode: "environment" },
                { fps: 5, qrbox: { width: 100, height: 100 } },
                () => {},
                () => {}
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await html5QrCode.stop();
        } catch (error) {
            console.warn("Warm-up failed:", error);
        } finally {
            document.getElementById(warmupElementId).innerHTML = "";
            setCameraInitializing(false);
        }
        };
        warmUpCamera();
    }, []);
    
    const startScanner = async () => {
        if (scanning || cameraInitializing) return;
    
        setScanning(true);
        setScannedCode(null);
        setProductInfo(null);
    
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
    
        try {
            const cameras = await Html5Qrcode.getCameras();
            if (!cameras || cameras.length === 0) {
                alert("No cameras found.");
                setScanning(false);
                return;
            }
    
          // Prefer DroidCam on laptop; use first camera on mobile
            let selectedCamera = isMobile
            ? cameras[0]
            : cameras.find((device) =>
                device.label.toLowerCase().includes("droidcam")
            ) || cameras[0];
    
            html5QrCodeRef.current = new Html5Qrcode("reader_2");
    
            await html5QrCodeRef.current.start(
                // { deviceId: { exact: selectedCamera.id } },
                { facingMode: "environment" },
                config,
                async (decodedText) => {
                    await html5QrCodeRef.current.stop();
                    setScannedCode(decodedText);
                    // setBarcode(decodedText);
                    fetchProductInfo(decodedText);
                    setScanning(false);
                },
                (errorMessage) => {
                if (!errorMessage.includes("NotFoundException")) {
                    console.warn("Scanning error:", errorMessage);
                }
                }
            );
        } catch (error) {
            console.error("Camera start error:", error);
            setScanning(false);
        }
    };
    
    const fetchProductInfo = (barcode) => {
        axios(`${apiUrl}/admin/items/get-product-by-barCode/${barcode}`)
            .then((response) => {
                // setProductInfo(response.data);
                if (onBarcodeScanned) {
                    onBarcodeScanned(response.data);
                }
                console.log("product found: ", response.data)
            })
            .catch((err) =>
                console.error("Failed to fetch product info:", err)
            );
        };
    
    const stopScanner = async () => {
        if (html5QrCodeRef.current) {
            await html5QrCodeRef.current.stop().catch(() => {});
            html5QrCodeRef.current.clear();
        }
        setScanning(false);
    };
    
    useEffect(() => {
        return () => {
            stopScanner();
        };
    }, []);
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
            <ScanBarcode className="" size={30} />
        </div>
        <div id="reader_warmup" style={{ display: "none" }}></div>
        {cameraInitializing && (
            <p className=" w-28 absolute top-6 text-xs text-gray-800 mt-1 animate-pulse">⏳ ...</p>
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
                {/* {productInfo && (<p>name: {productInfo.productName} price: {productInfo.price} </p>)} */}
            </>
        )}

        
    </div>
  )
}

export default BarcodeOrder
