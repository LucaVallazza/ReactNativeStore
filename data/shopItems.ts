export const shopItems: ShopItem[] = [
    {
        name: "Water Bottle",
        value: 10,
        url: "https://media.istockphoto.com/id/844061970/vector/water-bottle-flat-icon.jpg?s=612x612&w=0&k=20&c=lowO7ydHylqab38fSlr7u1QpK6PZyfPK9ayOyZUWV3E=" // Add the URL here
    },
    {
        name: "Burger",
        value: 50,
        url: "https://img.freepik.com/vector-gratis/icon-vector-dibujos-animados-hamburguesas-ilustracion-icon-objeto-alimentos-vector-plano-aislado_138676-13218.jpg" // Add the URL here
    },
    {
        name: "Soda Can",
        value: 15,
        url: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b7951d143850789.628259260734d.jpg" // Add the URL here
    },
    {
        name: "Bread",
        value: 5,
        url: "https://static.vecteezy.com/system/resources/previews/010/885/392/non_2x/bread-illustration-free-vector.jpg" // Add the URL here
    },
    {
        name: "Apple",
        value: 7,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6wHW8T8342jeYYXEIpvePUetLUucH7tGQA&s" // Add the URL here
    },
    {
        name: "Pencil",
        value: 3,
        url: "https://static.vecteezy.com/system/resources/thumbnails/008/693/300/small/pencil-cartoon-illustration-vector.jpg" // Add the URL here
    },
    {
        name: "Bowl of Soup",
        value: 30,
        url: "https://st5.depositphotos.com/1098327/62418/v/450/depositphotos_624183422-stock-illustration-hot-vegetable-soup-vector-illustration.jpg" // Add the URL here
    },
    {
        name: "Flower",
        value: 20,
        url: "https://i.pinimg.com/736x/04/cb/f7/04cbf7ba3a195320d1bae63207f2115c.jpg" // Add the URL here
    }
];

export interface ShopItem {
    name : string,
    value : number,
    url : string 
}