const form = document.getElementById("surveyForm");
const errorMessage = document.getElementById("error-message");

// قراءة العداد
let saved = JSON.parse(localStorage.getItem("surveyData")) || [];
let count = saved.length;

if(document.getElementById("counter")){
    document.getElementById("counter").innerText = count;
}

form.addEventListener("submit", function(e) {

    e.preventDefault();
    errorMessage.textContent="";

    const data = {};

    // اسم الطالب
    const nameInput = document.querySelector('[name="studentName"]');
    const classInput = document.querySelector('[name="studentClass"]');

    
    data.studentClass = classInput ? classInput.value.trim() : "";

    if(data.studentName==="" || data.studentClass===""){
        errorMessage.textContent="⚠️ اكتب الصف";
        return;
    }

    // الاسئلة 1-8
    for(let i=1;i<=8;i++){

        const answer=document.querySelector(`input[name="q${i}"]:checked`);

        if(!answer){
            errorMessage.textContent="⚠️ الرجاء تعبئة جميع الأسئلة قبل الإرسال.";
            return;
        }

        data[`q${i}`]=answer.value;
    }

    // السؤال 9
    const q9=document.querySelector('textarea[name="q9"]').value.trim();

    if(q9===""){
        errorMessage.textContent="⚠️ الرجاء تعبئة جميع الأسئلة قبل الإرسال.";
        return;
    }

    data.q9=q9;

    // ⭐⭐⭐ هنا الحفظ الحقيقي
    let all=JSON.parse(localStorage.getItem("surveyData"))||[];

    all.push(data);

    localStorage.setItem("surveyData",JSON.stringify(all));

    // تحديث العداد
    if(document.getElementById("counter")){
        document.getElementById("counter").innerText=all.length;
    }

    // اظهار رسالة الشكر
    document.getElementById("form-section").classList.add("hidden");
    document.getElementById("thankyou-section").classList.remove("hidden");

});

