import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

let scannerInitialized = false;

const ScanQRCode = () => {
    useEffect(() => {
        if(!scannerInitialized) {
            var Html5QrcodeScanner = new Html5QrcodeScanner("matricula", { fps: 10, qrbox: 250, aspectRatio: 1.333334, });
            Html5QrcodeScanner.render(onScanSuccess);
            scannerInitialized = true;
        }
    }, []);

    const onScanSuccess = (decodedText, decodedResult) => {
        console.log(`Scan result: ${decodedText}`);
    }

    return <div id="matricula"/>;
}

export default ScanQRCode;