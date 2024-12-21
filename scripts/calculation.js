import { validateForm } from "./form-validation.js";

document.querySelector("#calculate-button").addEventListener("click", () => {
    const form = document.querySelector("#destiny-form");

    if (!validateForm(form)) return;

    const name = form.name.value.trim();
    const dateOfBirth = form["date-of-birth"].value.trim();

    const mainEnergy = calculateMainEnergy(dateOfBirth);
    const matrixData = calculateMatrix(name, mainEnergy);
    const ageStages = calculateAgeStages(mainEnergy);

    revealPointsAndAges();
    updateMatrixPoints(matrixData);
    updateMatrixAges(ageStages);
});

function calculateMainEnergy(dateOfBirth) {
    const digits = dateOfBirth.replace(/-/g, "").split("").map(Number);
    let sum = digits.reduce((acc, num) => acc + num, 0);
    while (sum > 9) {
        sum = String(sum)
            .split("")
            .reduce((acc, num) => acc + Number(num), 0);
    }
    return sum;
}

function calculateMatrix(name, mainEnergy) {
    const nameValue = name
        .toUpperCase()
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return {
        center: mainEnergy,
        "karma-top": mainEnergy + 2,
        "karma-bottom": mainEnergy + 3,
        "father-start": (mainEnergy + nameValue) % 9 || 9,
        "mother-start": mainEnergy + 5,
        "father-end": mainEnergy + 4,
        "mother-end": mainEnergy + 6,
        financial: mainEnergy * 2,
        health: mainEnergy * 3,
        relationship: mainEnergy + 7,
        "karma-left": mainEnergy - 1,
        "karma-right": mainEnergy + 1,
        bottom: mainEnergy + 8,
        top: mainEnergy - 2,
        "mid-left": mainEnergy * 2 - 5,
        "mid-right": mainEnergy * 2 + 5,
        "low-center-left": mainEnergy * 2 + 2,
        "low-center-right": mainEnergy * 3 + 1,
        "mid-low-center": mainEnergy + 9,
        "top-mid-1": mainEnergy + 4,
        "top-mid-2": mainEnergy - 3,
        "low-right": mainEnergy * 2 - 4,
        "low-mid-bottom": mainEnergy + 11,
        "mid-low-left": mainEnergy - 7,
        "top-mid-left": mainEnergy * 3 - 6,
        "father-mid": mainEnergy * 2,
        "mother-mid": mainEnergy + 10,
        "top-right": mainEnergy + 12,
        "low-mid-right": mainEnergy * 2 + 1,
        "low-outer-right": mainEnergy * 3,
        "low-outer-left": mainEnergy * 2 - 1,
        "low-mid-left": mainEnergy - 5,
        "mid-mid-left": mainEnergy + 13,
        "top-left": mainEnergy + 14,
        "mid-mid-right": mainEnergy + 15,
    };
}

function calculateAgeStages(mainEnergy) {
    const ageStages = {};

    for (let i = 1; i <= 79; i++) {
        const id = `years-old-${i}`;
        ageStages[id] = mainEnergy + i;
    }

    const ranges = [
        [1, 2],
        [2, 3],
        [3, 4],
        [6, 7],
        [7, 8],
        [8, 9],
        [11, 12],
        [12, 13],
        [13, 14],
        [16, 17],
        [17, 18],
        [18, 19],
        [21, 22],
        [22, 23],
        [23, 24],
        [26, 27],
        [27, 28],
        [28, 29],
        [31, 32],
        [32, 33],
        [33, 34],
        [36, 37],
        [37, 38],
        [38, 39],
        [41, 42],
        [42, 43],
        [43, 44],
        [46, 47],
        [47, 48],
        [48, 49],
        [51, 52],
        [52, 53],
        [53, 54],
        [56, 57],
        [57, 58],
        [58, 59],
        [61, 62],
        [62, 63],
        [63, 64],
        [66, 67],
        [67, 68],
        [68, 69],
        [71, 72],
        [72, 73],
        [73, 74],
        [76, 77],
        [77, 78],
        [78, 79],
    ];

    ranges.forEach(([start, end]) => {
        const id = `years-old-${start}-${end}`;
        ageStages[id] = mainEnergy + start + end;
    });

    return ageStages;
}

function revealPointsAndAges() {
    const allPoints = document.querySelectorAll(".point");
    const allAges = document.querySelectorAll(".age");

    allPoints.forEach((point) => {
        point.style.visibility = "visible";
    });

    allAges.forEach((age) => {
        age.style.visibility = "visible";
    });
}

function updateMatrixPoints(results) {
    Object.entries(results).forEach(([id, value]) => {
        const pointElement = document.getElementById(id);
        if (pointElement) pointElement.textContent = value;
    });
}

function updateMatrixAges(ageResults) {
    Object.entries(ageResults).forEach(([id, value]) => {
        const ageElement = document.getElementById(id);
        if (ageElement) ageElement.textContent = value;
    });
}
