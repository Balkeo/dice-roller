import styled from "styled-components";
import { useState, useEffect } from "react";

import { Colors } from './Colors'
import Input from './Input'
import Button from './Button'
import ComboInput from './ComboInput'

import "./styles.css";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const LeftMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.brown1};
  height: 100%;
  width: 150px;
  padding: 15px 0;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.black50};
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  display: flex;
  border: 1px ${Colors.carbon} solid;
  padding: 0;
`;

export default function App() {
  /**
   * dicehex - hexcode - sets the dice’s body colour.
   * labelhex - hexcode - set’s the number’s colour.
   * transparency - number 0-1 - set’s an opacity on the dice.
   * chromahex - hexcode - sets background colour
   * shadows - 0 or 1 - turns off dice shadows. 
   * noresult - no input- turns off the results text
   * roll- no input- immediately rolls on page load.
   * d - dice notation (see below) - set’s the starting dice
  */

    // URL variable for Bee's Dice Roller
  const [diceColor, setDiceColor] = useState("000000");
  const [labelColor, setLabelColor] = useState("FFFFFF");
  const [backgroundColor, setBackgroundColor] = useState("FFFFFF");
  const [diceShadow, setDiceShadow] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [instantRoll, setInstantRoll] = useState(true);
  const [diceQuery, setDiceQuery] = useState("");

    // Variable for 
  const diceRolleBaseUrl = "./Dice/index.html";
  const [diceRollerUrl, setDiceRolleUrl] = useState(
    diceRolleBaseUrl
  );
  const [resetTime, setResetTime] = useState(5);

  const makeUrlQuery = () => {
    const dicehex = "?dicehex=" + diceColor
    const labelhex = "&labelhex=" + labelColor
    const chromahex = "&chromahex=" + backgroundColor
    const shadows = "&shadows=" + parseInt(diceShadow).toString
    const noresult = showResult ? "&noresult" : ""
    const roll = instantRoll ? "&roll" : ""
    const d = "&d=" + diceQuery
    console.log(diceQuery)

    return dicehex+labelhex+chromahex+shadows+noresult+roll+d
  }

  const rollTheDice = () => {
    setDiceRolleUrl(
      diceRolleBaseUrl+makeUrlQuery()
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDiceRolleUrl(diceRolleBaseUrl)
    }, resetTime * 1000);
    return () => clearTimeout(timer);
  }, [diceRollerUrl]);

  return (
    <Container className="App">
      <LeftMenu>
        <Input type="color" value={"#"+diceColor} onChange={(e) => {setDiceColor(e.target.value.substring(1))}} />
        <Input type="color" value={"#"+labelColor} onChange={(e) => {setLabelColor(e.target.value.substring(1))}} />
        <Input type="color" value={"#"+backgroundColor} onChange={(e) => {setBackgroundColor(e.target.value.substring(1))}} />
        <Input type="checkbox" checked={diceShadow} onChange={(e) => {setDiceShadow(e.target.checked)}} />
        <Input type="checkbox" checked={showResult} onChange={(e) => {setShowResult(e.target.checked)}} />
        <Input type="checkbox" checked={instantRoll} onChange={(e) => {setInstantRoll(e.target.checked)}} />
        <ComboInput diceQuery={diceQuery} setDiceQuery={setDiceQuery}/>
        <Button
          onClick={() => rollTheDice()}
        >
          Roll !
        </Button>
      </LeftMenu>
      <RightContent>
        <Iframe
          id="diceFrame"
          title="The Dice roller"
          width="800"
          height="600"
          src={diceRollerUrl}
        ></Iframe>
      </RightContent>
    </Container>
  );
}
