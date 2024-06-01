import React, { useState } from 'react';
import './App.css';
import meatImage from './assets/meat.png';
import saladImage from './assets/salad.png';
import baconImage from './assets/bacon.png';
import cheeseImage from './assets/cheese.png';

type Ingredient = {
    name: string;
    price: number;
    image: string;
};

const INGREDIENTS: Ingredient[] = [
    { name: 'Meat', price: 80, image: meatImage },
    { name: 'Cheese', price: 50, image: cheeseImage },
    { name: 'Salad', price: 10, image: saladImage },
    { name: 'Bacon', price: 60, image: baconImage },
];

type IngredientItemProps = {
    ingredient: Ingredient;
    count: number;
    addIngredient: () => void;
    removeIngredient: () => void;
};

const IngredientItem: React.FC<IngredientItemProps> = ({
                                                           ingredient,
                                                           count,
                                                           addIngredient,
                                                           removeIngredient
                                                       }) => {
    return (
        <div className="ingredient-item">
            <img src={ingredient.image} alt={ingredient.name} className="ingredient-image" />
            <span>{ingredient.name} x{count}</span>
            <button onClick={addIngredient}>+</button>
            <button onClick={removeIngredient}>-</button>
        </div>
    );
};

type IngredientsListProps = {
    ingredientsCount: { [key: string]: number };
    addIngredient: (ingredient: Ingredient) => void;
    removeIngredient: (ingredient: Ingredient) => void;
};

const IngredientsList: React.FC<IngredientsListProps> = ({
                                                             ingredientsCount,
                                                             addIngredient,
                                                             removeIngredient
                                                         }) => {
    return (
        <div className="IngredientsList">
            <h3>Ingredients</h3>
            {INGREDIENTS.map(ingredient => (
                <IngredientItem
                    key={ingredient.name}
                    ingredient={ingredient}
                    count={ingredientsCount[ingredient.name] || 0}
                    addIngredient={() => addIngredient(ingredient)}
                    removeIngredient={() => removeIngredient(ingredient)}
                />
            ))}
        </div>
    );
};

type BurgerProps = {
    ingredients: Ingredient[];
};

// Компонент для отображения бургера
const Burger: React.FC<BurgerProps> = ({ ingredients }) => {
    return (
        <div className="Burger">
            <div className="BreadTop">
                <div className="Seeds1"></div>
                <div className="Seeds2"></div>
            </div>
            {ingredients.map((ingredient, index) => (
                <div key={index} className={ingredient.name}></div>
            ))}
            <div className="BreadBottom"></div>
        </div>
    );
};

const App: React.FC = () => {
    const [ingredientsCount, setIngredientsCount] = useState<{ [key: string]: number }>({});

    const addIngredient = (ingredient: Ingredient) => {
        setIngredientsCount(prevCount => ({
            ...prevCount,
            [ingredient.name]: (prevCount[ingredient.name] || 0) + 1
        }));
    };

    const removeIngredient = (ingredient: Ingredient) => {
        setIngredientsCount(prevCount => {
            const currentCount = prevCount[ingredient.name] || 0;
            if (currentCount === 0) return prevCount;
            return {
                ...prevCount,
                [ingredient.name]: currentCount - 1
            };
        });
    };

    const calculatePrice = () => {
        const basePrice = 30;
        return Object.entries(ingredientsCount).reduce(
            (total, [name, count]) => {
                const ingredient = INGREDIENTS.find(ing => ing.name === name);
                return total + (ingredient ? ingredient.price * count : 0);
            },
            basePrice
        );
    };

    const ingredients = Object.entries(ingredientsCount).reduce<Ingredient[]>(
        (arr, [name, count]) => {
            const ingredient = INGREDIENTS.find(ing => ing.name === name);
            if (ingredient) {
                for (let i = 0; i < count; i++) {
                    arr.push(ingredient);
                }
            }
            return arr;
        },
        []
    );

    return (
        <div className="App">
            <IngredientsList
                ingredientsCount={ingredientsCount}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
            />
            <Burger ingredients={ingredients} />
            <div className="Price">Price: {calculatePrice()} сом</div>
        </div>
    );
};

export default App;
