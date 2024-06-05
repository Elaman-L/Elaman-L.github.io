export function map() {
  let center = [42.90838546022627, 74.60852025187474];

  function initMap() {
    let map = new ymaps.Map("map", {
      center: center,
      zoom: 16,
      controls: [],
    });

    let placemark = new ymaps.Placemark(
      center,
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "./img/location.gif",
        iconImageSize: [38, 40],
        iconImageOffset: [-18, -44],
      }
    );

    map.controls.remove("geolocationControl"); // удаляем геолокацию
    map.controls.remove("searchControl"); // удаляем поиск
    map.controls.remove("trafficControl"); // удаляем контроль трафика
    map.controls.remove("typeSelector"); // удаляем тип
    map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove("zoomControl"); // удаляем контрол зуммирования
    map.controls.remove("rulerControl"); // удаляем контрол правил

    // Отключаем возможность перемещения карты
    map.behaviors.disable("scrollZoom");
    map.behaviors.disable("drag"); // Отключаем перемещение карты

    map.geoObjects.add(placemark);
  }

  ymaps.ready(initMap);
}
