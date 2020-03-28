import React from 'react';
import Currency from './Currency';

function reverse(str) {
  return str.split('').reverse().join('');
}

function getAmounts(input) {
  if(!input) {
    input = 0;
  }
  let str = input.toString();
  let negative = false;
  if(str[0] === '-') {
    negative = true;
    str = str.substring(1, str.length);
  }
  const reversed = reverse(str);
  let copper = reversed.substring(0, 2);
  let silver = reversed.substring(2, 4);
  let gold = reversed.substring(4, str.length);
  if(negative) {
    if(isNaN(parseInt(gold))) {
      silver = `${silver}-`;
    } else if (isNaN(parseInt(silver))) {
      copper = `${copper}-`;
    } else {
      gold = `${gold}-`;
    }
  }

  return {
    copper: parseInt(reverse(copper), 10),
    silver: parseInt(reverse(silver), 10),
    gold: parseInt(reverse(gold), 10)
  }
}

export default ({amount}) => {
  const { copper, silver, gold } = getAmounts(amount);
  return(
    <span>
      <Currency amount={gold} image={'/img/Gold_coin.png'} />
      <Currency amount={silver} image={'/img/Silver_coin.png'} />
      <Currency amount={copper} image={'/img/Copper_coin.png'} />
    </span>
  )
}