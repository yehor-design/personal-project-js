const NAME_REGEX = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ]+$/;
const MIN_YEAR = 1950;
const MAX_YEAR = new Date().getFullYear();

function validateName(name) {
    if (!name) {
        alert("Будь ласка, введіть ваше ім'я.");
        return false;
    }
    if (!NAME_REGEX.test(name)) {
        alert("Ім'я має містити лише літери (без пробілів, цифр та символів).");
        return false;
    }
    return true;
}

function validateDateOfBirth(dateOfBirth) {
    if (!dateOfBirth) {
        alert("Будь ласка, оберіть дату вашого народження.");
        return false;
    }
    const [year] = dateOfBirth.split("-").map(Number);
    if (year < MIN_YEAR || year > MAX_YEAR) {
        alert(`Рік народження має бути між ${MIN_YEAR} та ${MAX_YEAR}.`);
        return false;
    }
    return true;
}

export function validateForm(form) {
    const name = form.name.value.trim();
    const dateOfBirth = form["date-of-birth"].value.trim();
    return validateName(name) && validateDateOfBirth(dateOfBirth);
}
