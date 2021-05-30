import styled from "styled-components";
import { useState } from "react";

import Input from './Input'
import Button from './Button'

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    margin-bottom: 5px;
`;

const Items = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ItemControls = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export default function ComboInput({
    diceQuery,
    setDiceQuery
}) {
    const [inputNumber, setInputNumber] = useState(1);
    const [inputsValue, setInputsValue] = useState([""])

    const addItem = () => {
        setInputNumber(inputNumber + 1)
    }

    const RemoveItem = () => {
        let newInputsValue = inputsValue
        newInputsValue.pop();
        setInputsValue(newInputsValue)
        let newInputNumber = inputNumber - 1
        if (newInputNumber < 1) {
            newInputNumber = 1
        }
        setInputNumber(newInputNumber)
        setDiceQuery(inputsValue.join("+"))
    }

    const updateInput = (index, value) => {
        let newInputsValue = inputsValue
        newInputsValue[index] = value
        setInputsValue(newInputsValue)
        setDiceQuery(inputsValue.join("+"))
    }

    const renderItems = () => {
        let items = []
        for (let i = 0; i < inputNumber; i++) {
            items.push(
                (<Input type="text" key={i} onChange={(e) => updateInput(i, e.target.value)}></Input>)
            )
        }
        
        return items
    }

    return (
        <Container>
            <Items>
                {renderItems()}
            </Items>
            <ItemControls>
                <Button onClick={() => addItem()}>+</Button>
                <Button onClick={() => RemoveItem()} disabled={inputNumber === 1}>-</Button>
            </ItemControls>
            {diceQuery}
        </Container>
    )
}