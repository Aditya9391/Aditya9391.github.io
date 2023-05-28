function Item(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.selected = false;
}
var obj = {
    itemList: [],
    addItem: function(id, name, price, image) {
        var item = new Item(id, name, price, image);
        this.itemList.push(item);
    },
    deleteItem: function(id) {
        toDelete = this.itemList.filter(function(product) {
            return product.id == id;
        });
        toDelete[0].selected = true;
        this.itemList = this.itemList.filter(function(obj) {
            return obj.selected == false;
        });



    }

}