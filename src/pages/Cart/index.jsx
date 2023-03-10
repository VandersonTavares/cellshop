import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { getItem, setItem } from "../../services/LocalStorage";

import { BsFillCartDashFill } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";

const Container = styled.div`
  margin-left: 60px;

  h1 {
    padding: 20px;
  }
  h3 {
    margin-top: 20px;
    color: crimson;

  }
  span {
    font-size: 70px;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 30px;
  margin-bottom: 60px;
  justify-content: center;
  align-items: center;

  div {
    height: 320px;
    width: 250px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    border-radius: 10px 10px 10px 10px;
    -moz-border-radius: 10px 10px 10px 10px;
    -webkit-border-radius: 10px 10px 10px 10px;
    border: 0px solid #000000;

    -webkit-box-shadow: 0px 5px 12px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 5px 12px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 5px 12px -3px rgba(0, 0, 0, 0.75);
  }

  .price {
    font-size: 25px;
    color: crimson;
  }
  .title {
    color: hsl(24deg 2% 50%);
  }

  button {
    font-size: 20px;
  }
`;

function Cart() {
  const [data, setData] = useState(getItem("carrinho") || []);

  const subTotal = data
    .reduce((acc, curr) => acc + curr.price, 0)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  function removeItem(obj) {
    const arrFilter = data.filter((item) => item.id !== obj.id);
    setData(arrFilter);
    setItem("carrinho", arrFilter);
  }

  return (
    <Container>
      <h1>Página Carrinho</h1>
      <hr />
      {/* adicionar verificação condicional */}
      {true ? (
        <h3>Subtotal: {subTotal}</h3>
      ) : (
        <div>
          <h3>Carrinho Vazio</h3>
          <Link to="/">
            <span>
              <MdAddShoppingCart />
            </span>
          </Link>
        </div>
      )}
      <ProductContainer>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <h4 className="title">{item.title}</h4>
              <img src={item.thumbnail} alt="img-pic" />
              <h4 className="price">
                {item.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h4>
              <button onClick={() => removeItem(item)}>
                <BsFillCartDashFill />
              </button>
            </div>
          );
        })}
      </ProductContainer>
    </Container>
  );
}
export default Cart;
