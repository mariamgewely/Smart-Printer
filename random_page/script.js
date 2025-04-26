// المراجع
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const randomNumberDisplay = document.getElementById('random-number');
const generateBtn = document.getElementById('generate-btn');
const scanBtn = document.getElementById('scan-btn');
const doneBtn = document.getElementById('done-btn');
const forgetBtn = document.getElementById('forget-btn');
const digitInputs = document.querySelectorAll('.digit-input');

let currentRandomNumber = '';

// دالة لتوليد رقم عشوائي من 6 أرقام
function generateRandomNumber() {
    let number = '';
    for (let i = 0; i < 6; i++) {
        number += Math.floor(Math.random() * 10);
    }
    return number;
}

// دالة لعرض الرقم العشوائي
function displayRandomNumber() {
    currentRandomNumber = generateRandomNumber();
    randomNumberDisplay.textContent = currentRandomNumber;
}

// حدث لزر التوليد
generateBtn.addEventListener('click', displayRandomNumber);

// حدث لزر المسح الضوئي
scanBtn.addEventListener('click', function () {
    page1.classList.remove('active');
    page2.classList.add('active');
    setupInputFields();
});

// حدث لزر النسيان
forgetBtn.addEventListener('click', function () {
    page2.classList.remove('active');
    page1.classList.add('active');
    displayRandomNumber();
});

// حدث لزر الإنتهاء
doneBtn.addEventListener('click', function () {
    // هنا يمكن إضافة التحقق من الرقم المدخل
    alert('تم الإدخال بنجاح!');
});

// إعداد حقول الإدخال
function setupInputFields() {
    digitInputs.forEach((input, index) => {
        input.value = ''; // إعادة تعيين القيمة

        input.addEventListener('input', function () {
            if (this.value.length === 1) {
                if (index < digitInputs.length - 1) {
                    digitInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', function (e) {
            // السماح بالتنقل باستخدام مفاتيح الأسهم
            if (e.key === 'ArrowRight' && index > 0) {
                digitInputs[index - 1].focus();
            } else if (e.key === 'ArrowLeft' && index < digitInputs.length - 1) {
                digitInputs[index + 1].focus();
            } else if (e.key === 'Backspace' && this.value === '' && index > 0) {
                // إذا كان الحقل فارغ وتم الضغط على مفتاح الحذف، انتقل إلى الحقل السابق
                digitInputs[index - 1].focus();
            }
        });
    });

    // تركيز على الحقل الأول
    digitInputs[0].focus();
}

// توليد رقم عشوائي عند تحميل الصفحة
displayRandomNumber();