import sha256 from 'crypto-js/sha256';
import rice from './pictures/rice.jpg';
import friedrice from './pictures/friedrice.jpg'
import noodles from './pictures/noodles.jpg';
import salmon from './pictures/salmon.jpg';
import scalloppies from './pictures/scalloppies.jpg';
import cheeseham from './pictures/CheeseHam.jpg';
import aspa from './pictures/aspa.jpg';

const items = [
    {   
        type: 'Rice',
        title: 'Premium Japanese Rice',
        img: `${rice}`,
        text: 'A short-grain cultivar of Japonica rice that is characterized by its unique stickiness and texture',
        price: 1
    },
    {   
        type: 'Rice',
        title: 'Fried Rice',
        img: `${friedrice}`,
        text: 'A bowl of steaming white rice cooked to just the right consistency, filled with bits of meat and vegetable.',
        price: 2.50
    },
    {   
        type: 'Noodles',
        title: 'Mee Goreng',
        img: `${noodles}`,
        text: 'Maggi brand of instant noodles, prepared with hot water before stir-frying with seafood, bean sprouts, coriander, and a sambal (spicy chilli relish) sauce made up of twelve herbs and spices',
        price: 1
    },
    {   
        type: 'Appetizer',
        title: 'Smoked Salmon Sandwich',
        img: `${salmon}`,
        text: 'The sandwich itself is pretty simple, featuring ingredients such as cream cheese, smoked salmon, avocados (because they’re the best in sandwiches), tomatoes, radishes and alfalfa sprouts in between 2 slices of delicious whole wheat grain bread, but simple doesn’t make it boring! This sandwich is full of fresh flavor and is sure to satisfy.',
        price: 1
    },
    {   
        type: 'Appetizer',
        title: 'Scallop Shell Pies',
        img: `${scalloppies}`,
        text: 'We serve these pretty pies in their original scallop shell and top with flaky puff pastry, a perfect way to start your dinner with friends.',
        price: 2
    },//Marinated figs with mozzarella and serrano ham
    {   
        type: 'Appetizer',
        title: 'Mozarella and Serrano Ham',
        img: `${cheeseham}`,
        text: 'Pickled fig with creamy mozzarella, salty serrano ham and peppery rocket',
        price: 1.50
    },
    {   
        type: 'Appetizer',
        title: 'Asparagus with butter',
        img: `${aspa}`,
        text: 'Asparagus with butter, balsamic and capers makes a great starter or lunch plus it\'s under 300 calories!',
        price: 2.50
    },
]

items.map((item,idx)=> {
    return item.id = sha256(((idx+1)*100).toString() + item.type.slice(0,3)).toString()
})

export default items