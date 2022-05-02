import { Container, Box, Typography } from "@mui/material";
import AddProduct from "../AddProduct/AddProduct.jsx";
import { Tooltip, IconButton } from "@mui/material";
import { Delete, Edit, Block } from "@mui/icons-material/";

export default function CardVendedor({
  nombre,
  id,
  image,
  stock,
  precio,
  category,
  description,
  removeProduct,
  input,
  setInput,
  prodId,
  setProdId,
  handleClose,
  handleOpen,
  handleSubmit,
  handleDisable,
  banned
}) {
  function handleUpdate(event) {
    setProdId(event.currentTarget.getAttribute("id"));
    setInput({
      name: event.currentTarget.getAttribute("name"),
      description: event.currentTarget.getAttribute("description"),
      image: event.currentTarget.getAttribute("image"),
      stock: event.currentTarget.getAttribute("stock"),
      category: event.currentTarget.getAttribute("category").split(","),
      price: event.currentTarget.getAttribute("price"),
    });
    handleOpen();
  }

  return (
    <Container
      sx={{
        height: "100px",
        width: "500px",
        border: "2px solid gray",
        margin: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          height: "max-content",
        }}
      >
        <img src={image} alt="pic" width="60px" />
      </Box>

      <Box
        sx={{
          width: "250px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          component="span"
          sx={{
            margin: "10px 0px",
          }}
        >
          {`${nombre}`}
        </Typography>
        <Typography
          component="span"
          sx={{
            margin: "10px 0px",
          }}
        >
          {`Stock: ${stock}`}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div >
          <Tooltip title="Reponer" arrow>
            <IconButton
              name={nombre}
              description={description}
              image={image}
              stock={stock}
              category={category}
              price={precio}
              onClick={handleUpdate}
              id={id}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" arrow>
            <IconButton id={id} onClick={() => removeProduct(id)}>
              <Delete sx={{ color: "#E2001A" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deshabilitar" arrow>
            <IconButton onClick={() => handleDisable(id, banned)} >
              <Block sx={{ color: "#E2001A" }} />
            </IconButton>
          </Tooltip>
        </div>
      </Box>
      <AddProduct
        prodId={prodId}
        input={input}
        setInput={setInput}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
