export function calculate() {
  const carpets = []; // Массив для хранения информации о коврах

  // Получение ссылок на HTML-элементы
  const $addButton = document.getElementById("add-btn");
  const $removeButton = document.getElementById("remove-btn");
  const $widthInp = document.getElementById("width-inp");
  const $heightInp = document.getElementById("height-inp");
  const $tBody = document.getElementById("carpets-tables");

  // Скрытие кнопки удаления при инициализации
  $removeButton.classList.add("btn-hidden", "display-none");

  // Функция для создания строки таблицы с информацией о ковре
  const createCarpetRow = (carpet) => {
    const $carpetTr = document.createElement("tr");
    $carpetTr.dataset.number = carpet.number;

    const $numberTd = document.createElement("td");
    $numberTd.textContent = carpet.number;

    const $widthTd = document.createElement("td");
    $widthTd.textContent = `${carpet.width} м²`;

    const $heightTd = document.createElement("td");
    $heightTd.textContent = `${carpet.height} м²`;

    const $totalsquareTd = document.createElement("td");

    // Проверка, имеет ли число дробную часть
    if (carpet.totalSquare % 1 !== 0) {
      $totalsquareTd.textContent = `${carpet.totalSquare.toFixed(2)} м²`;
    } else {
      $totalsquareTd.textContent = `${carpet.totalSquare} м²`;
    }

    const $deleteTd = document.createElement("td");
    const $deleteBtn = document.createElement("button");
    $deleteBtn.classList.add("btn-reset", "btn-delete");
    $deleteBtn.textContent = "Удалить";

    if (window.innerWidth <= 600) {
      $deleteBtn.textContent = "x";
    }

    $deleteBtn.addEventListener("click", () => removeCarpet(carpet.number));
    $deleteTd.appendChild($deleteBtn);

    $carpetTr.append($numberTd, $widthTd, $heightTd, $totalsquareTd, $deleteTd);
    $carpetTr.classList.add("tr-hidden");

    return $carpetTr;
  };

  // Функция для удаления ковра по номеру
  const removeCarpet = (number) => {
    const index = carpets.findIndex((carpet) => carpet.number === number);
    if (index !== -1) {
      carpets.splice(index, 1);
      renumberCarpets();
      render();
    }
  };

  // Функция для перенумерации ковров после удаления
  const renumberCarpets = () => {
    carpets.forEach((carpet, index) => {
      carpet.number = index + 1;
    });
  };

  // Функция для вычисления общей площади и стоимости всех ковров
  const calculateTotal = () => {
    const totalSquareAll = carpets.reduce(
      (accum, carpet) => accum + carpet.totalSquare,
      0
    );
    const totalPrice = totalSquareAll * 80; // Цена за м²

    return {
      totalSquareAll,
      totalPrice,
    };
  };

  // Функция для создания строки с общей информацией
  const createTotalRow = (totalSquareAll, totalPrice) => {
    const $allTotalTr = document.createElement("tr");
    const $allTotalTd = document.createElement("td");
    $allTotalTd.colSpan = 5;

    if (carpets.length === 1) {
      $allTotalTd.textContent = `Стоимость: ${totalPrice} сом`;
    } else {
      $allTotalTd.innerHTML = `Общая площадь: ${totalSquareAll} м² <br>Общая стоимость: ${totalPrice} сом`;
    }

    $allTotalTr.appendChild($allTotalTd);
    return $allTotalTr;
  };

  // Функция для обновления отображения таблицы с коврами
  const render = () => {
    $tBody.innerHTML = "";

    carpets.forEach((carpet, index) => {
      const $carpetTr = createCarpetRow(carpet);
      $tBody.appendChild($carpetTr);
      setTimeout(() => {
        $carpetTr.classList.remove("tr-hidden");
        $carpetTr.classList.add("tr-visible");
      }, 250 * index);
    });

    if (carpets.length > 0) {
      const { totalSquareAll, totalPrice } = calculateTotal();
      const $totalRow = createTotalRow(totalSquareAll, totalPrice);
      $tBody.appendChild($totalRow);
    }

    $removeButton.classList.toggle("display-none", carpets.length === 0);
    $removeButton.classList.toggle("btn-visible", carpets.length > 0);
    $removeButton.classList.toggle("btn-hidden", carpets.length === 0);
  };

  // Обработчик нажатия кнопки добавления нового ковра
  $addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const width = parseFloat($widthInp.value);
    const height = parseFloat($heightInp.value);
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) return;

    const totalSquare = width * height;
    const number = carpets.length + 1;

    const newCarpet = { number, width, height, totalSquare };
    carpets.push(newCarpet);

    $widthInp.value = "";
    $heightInp.value = "";
    render();
  });

  // Обработчик нажатия кнопки удаления всех ковров
  $removeButton.addEventListener("click", (e) => {
    e.preventDefault();

    setTimeout(() => {
      carpets.length = 0;
      render();
    }, 500);
  });

  // Инициализация отображения при загрузке страницы
  render();
}
