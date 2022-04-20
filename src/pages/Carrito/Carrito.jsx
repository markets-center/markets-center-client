import React, { useEffect, useState } from "react";
import "./Carrito.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
// import CardList from "./CardList";
import CardItem from "./CardItem";


import {
  Typography,
  Button,
  Divider
} from "@mui/material";

export default function Carrito() {

  const products = [
    {
      _id: "625e18ea9e864286771b0b9d",
      name: "Arroz Marolio",
      description:
        "Mate, cafe\nHarina y palmitos\nYerba, mermelada\nCacao, picadillo\nPaté, caballa\nArroz y arvejas\nSardinas y atún\nChoclo y lentejas\nMarolio le da sabor a tu vida\nMarolio esta desde el comienzo del dia",
      image:
        "http://res.cloudinary.com/markets-center/image/upload/v1650333930/zmbtiqs8lndcll50hg9m.jpg",
      category: [
        {
          _id: "625e18528435e20ed2b70f6c",
          name: "Cereales y derivados",
        },
      ],
      stock: 45,
      price: 500,
      userId: "625c8bf646bd1097c3076bfd",
      createdAt: "2022-04-19T02:05:30.520Z",
      updatedAt: "2022-04-19T17:12:46.901Z",
      __v: 0,
    },
    {
      _id: "625e19889e864286771b0ba4",
      name: "Cerveza Corona",
      description:
        "La cervecita de Toreto un Lunes a las 23hs. -- LA FAMILIA ES LO PRIMERO--",
      image:
        "http://res.cloudinary.com/markets-center/image/upload/v1650334088/z5zebvdwblb1mi6n30oi.jpg",
      category: [
        {
          _id: "625e18848435e20ed2b70f72",
          name: "Bebidas alcohólicas",
        },
      ],
      stock: 18,
      price: 2000,
      userId: "625c8bf646bd1097c3076bfd",
      createdAt: "2022-04-19T02:08:08.839Z",
      updatedAt: "2022-04-19T17:15:18.094Z",
      __v: 0,
    },
    {
      _id: "625e2cfc99619ad71ce18de4",
      name: "Leche",
      description: "Esta un poco cara",
      image:
        "http://res.cloudinary.com/markets-center/image/upload/v1650339068/lsgjsmzdidsfa2woeaiy.jpg",
      category: [
        {
          _id: "625e17b58435e20ed2b70f5f",
          name: "Lacteos",
        },
      ],
      stock: 0,
      price: 2500,
      userId: "625c8c174166ea24dca8c4e6",
      createdAt: "2022-04-19T03:31:08.887Z",
      updatedAt: "2022-04-19T03:31:08.887Z",
      __v: 0,
    },
    {
      _id: "625ebee4b6d3124f0d79bdd5",
      name: "Arroz II",
      description: "bfhkdbjs",
      image:
        "http://res.cloudinary.com/markets-center/image/upload/v1650376420/fr88ahdpuvtjrlghyjyn.jpg",
      category: [
        {
          _id: "625e18528435e20ed2b70f6c",
          name: "Cereales y derivados",
        },
      ],
      stock: 195,
      price: 2000,
      userId: "625c8bf646bd1097c3076bfd",
      createdAt: "2022-04-19T13:53:40.657Z",
      updatedAt: "2022-04-19T17:13:52.589Z",
      __v: 0,
    },
    {
      _id: "625ebee4b6d3124f0d79bdd5",
      name: "Cangrejo",
      description: "ay mi cangrejo",
      image:
        "http://res.cloudinary.com/markets-center/image/upload/v1650376420/fr88ahdpuvtjrlghyjyn.jpg",
      category: [
        {
          _id: "625e18528435e20ed2b70f6c",
          name: "Pesacados y mariscales",
        },
      ],
      stock: 195,
      price: 3400,
      userId: "625c8bf646bd1097c3076bfd",
      createdAt: "2022-04-19T13:53:40.657Z",
      updatedAt: "2022-04-19T17:13:52.589Z",
      __v: 0,
    },
  ];

  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);

  const findTotal = products.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    const st = (findTotal / 1.18);
    const igv = (findTotal - st);
    setSubtotal(st);
    setIva(igv);
    setTotal(findTotal);
  },[]);

  return (
    <div>
      <NavBar searchBar1={false} />
      <div className="car-container">
        <div className="items-content">
          {products?.map((item) => {
            return (
              <>
                <CardItem
                  item={item}
                  total={total}
                />
                <Divider/>
              </>
            );
          })}
        </div>
        <div className="pay-container">
          <div className="content-pay tittle-pay">
            <div className="lb-content">
              <Typography variant="body1">Sub Total:</Typography>
              <Typography variant="body1">Iva:</Typography>
              <Typography variant="body1">Total:</Typography>
            </div>
            <div className="lb-content">
              <Typography variant="body1">{subtotal.toFixed(2)}</Typography>
              <Typography variant="body1">{iva.toFixed(2)}</Typography>
              <Typography variant="body1">{total.toFixed(2)}</Typography>
            </div>
          </div>
          <hr />
          <div className="content-pay btn-pay">
            <Button variant="outlined" size="small">
              PAGAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
