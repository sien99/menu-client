import rice from './pictures/rice.jpg';
import friedrice from './pictures/friedrice.jpg'
import noodles from './pictures/noodles.jpg';
import appetizer from './pictures/appetizer.jpg';

const items = [
    {   
        type: 'Rice',
        title: 'Premium Japanese Rice',
        img: `${rice}`,
        text: 'simple rice',
        price: 1
    },
    {   
        type: 'Rice',
        title: 'Fried Rice',
        img: `${friedrice}`,
        text: 'simple rice 2',
        price: 2.50
    },
    {   
        type: 'Noodles',
        title: 'Mee Goreng',
        img: `${noodles}`,
        text: 'simple noodles',
        price: 1
    },
    {   
        type: 'Appetizer',
        title: 'Smoked Salmon Sandwich',
        img: `${appetizer}`,
        text: 'The sandwich itself is pretty simple, featuring ingredients such as cream cheese, smoked salmon, avocados (because they’re the best in sandwiches), tomatoes, radishes and alfalfa sprouts in between 2 slices of delicious whole wheat grain bread, but simple doesn’t make it boring! This sandwich is full of fresh flavor and is sure to satisfy.',
        price: 1
    }
]

items.map((item,idx)=> {
    return item.id = ((idx+1)*100).toString() + item.type.slice(0,3)
})

export default items