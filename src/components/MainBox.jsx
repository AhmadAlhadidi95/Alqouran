import "./mainBox.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export function MainBox() {

    const elementRef = useRef();

    const [model, setModel] = useState(false);
    const [ayahNumber, setAyahNumber] = useState(1);
    const [surahNumber, setSurahNumber] = useState(1);
    const [obj, setObj] = useState({
        "surahNameArabic": "...",
        "arabic1": "...",
        "ayahNo": "...",
        "totalAyah": "...",
        "audio": {
            "1": {"url": "Mishary"},
            "2": {"url": "AbuBakr"},
        },
    });

    const lastAyah = ayahNumber == obj.totalAyah;
    const firstAyah = ayahNumber != 1;

    function handleNextAyah() {

        lastAyah ? null : setAyahNumber(ayahNumber + 1);

        if (obj.ayahNo == obj.totalAyah) {

            setSurahNumber(surahNumber + 1);

            setAyahNumber(1);

        };

    };

    function handlePrevAyah() {

        firstAyah ? setAyahNumber(ayahNumber - 1) : null;

    };

    function handleSound1() {

        const abuBakr = new Audio(obj.audio[1].url);
        abuBakr.play();
        
    };
    
    function handleSound2() {

        const abuBakr = new Audio(obj.audio[2].url);
        abuBakr.play();
        
    };

    function handleMark() {

        localStorage.setItem("ayah", ayahNumber);
        localStorage.setItem("surah", surahNumber);
        
    };

    function handleCleanStorage() {

        localStorage.clear();

        setAyahNumber(1);
        setSurahNumber(1);

        setModel(false);
        
    };

    useEffect(() => {

        axios.get(`https://quranapi.pages.dev/api/${surahNumber}/${ayahNumber}.json`)
        .then(function (response) {
            // handle success
            setObj(response.data);

            // console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        // .finally(function () {
        //     // always executed
        // });

    }, [ayahNumber, surahNumber]);

    useEffect(() => {

        if (localStorage.length) {
            setAyahNumber(JSON.parse(localStorage.getItem("ayah")));
            setSurahNumber(JSON.parse(localStorage.getItem("surah")));
        };

    }, []);

    useEffect(() => {

        function handler(event) {
            if (elementRef.current && !elementRef.current.contains(event.target)) {
                setModel(false);
            };
        };

        document.addEventListener("mousedown", handler);

    }, []);

    return (
        <div className="mainBox">
            {model ? (
                <div className="model">
                    <p>هل أنت متأكد من ذلك؟</p>
                    <button className="mainBtn" onClick={handleCleanStorage} ref={elementRef}>نعم متأكد</button>
                    <button className="mainBtn" onClick={() => setModel(false)}>لا</button>
                </div>
            ) : (null)}

            <span className="mark" title="وضع الفاصلة هنا" onClick={handleMark}></span>

            <h1>القرآن الكريم</h1>

            <div className="info">
                <h4 dir="rtl">&#123; {obj.ayahNo} &#125; من &#123; {obj.totalAyah} &#125;</h4>
                <h3>الآية</h3>
                <h2>{obj.surahNameArabic}</h2>
            </div>

            <p className="ayah">{obj.arabic1}</p>

            <div className="buttonsBox one">
                <button className="mainBtn" onClick={handlePrevAyah}>{firstAyah ? "الآية السابقة" : "لا يوجد"}</button>
                <button className="mainBtn" onClick={handleNextAyah}>{lastAyah ? "السورة التالية" : "الآية التالية"}</button>
            </div>

            <div className="buttonsBox two">
                <h3>الإستماع بصوت</h3>
                <button className="mainBtn" onClick={handleSound1}>مشاري العفاسي</button>
                <button className="mainBtn" onClick={handleSound2}>أبو بكر الشاطري</button>
            </div>

            <div className="buttonsBox three">
                <button className="mainBtn" onClick={() => setModel(true)}>البدء من جديد</button>
            </div>
        </div>
    )
}