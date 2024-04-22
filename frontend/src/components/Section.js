export default class Section {
  constructor({
    items,
    renderer }, boxSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(boxSelector);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  //Метод addItem принимает на вход параметр element (HTML-разметку нового элемента "карточки места")
  //и выполняет его вставку в контейнер, заданный в соответствующем свойстве объекта.
  addItem(element) {
    this._container.prepend(element);
  }
}
