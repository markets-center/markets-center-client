import DatosVendedor from '../../components/Vendedor/DatosVendedor/DatosVendedor'
import CardVendedor from '../../components/Vendedor/CardVendedor/CardVendedor'
import { Container, Typography, Button} from '@mui/material'


export default function Vendedor(){
    const productos = [{nombre:'Leche',marca:'La Serenisima',urlImg:'https://www.casa-segal.com/wp-content/uploads/2020/04/leche-3-porciento-la-serenisima-sachet-rojo-1-lt-lacteos-casa-segal-mendoza.png',precio:'150'},
    {nombre:'Harina',marca:'Pureza',urlImg:'https://depotexpress.com.ar/tienda/wp-content/uploads/2020/06/HARINA-DE-TRIGO-PUREZA-0000-X-1.png',stock:'30', precio:'100'},
    {nombre:'Fideos Tallarines',marca:'Terrabusi',urlImg:'https://www.modomarket.com/26299-home_default/fideo-terrabusi-tallarin-x-500-gr.jpg',stock:'35',precio:'110'},
    {nombre:'Arroz',marca:'Gallo Oro',urlImg:'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/219/229/products/2411-60543d41464f3ddd5515988782714569-640-0.jpg',stock:'50',precio:'110'},
    {nombre:'Azucar',marca:'Ledesma',urlImg:'https://www.conradomarket.com.ar/images/000000000000100164048ALMACEN-Azucar-Ledesma-x-1-kg1.jpg',stock:'10',precio:'100'},
    {nombre:'Yerba',marca:'Taragüi',urlImg:'https://http2.mlstatic.com/D_NQ_NP_794896-MLA44134710145_112020-O.jpg',stock:'20',precio:'190'},
    {nombre:'Azucar',marca:'Ledesma',urlImg:'https://www.conradomarket.com.ar/images/000000000000100164048ALMACEN-Azucar-Ledesma-x-1-kg1.jpg',stock:'10',precio:'100'},
    {nombre:'Yerba',marca:'Taragüi',urlImg:'https://http2.mlstatic.com/D_NQ_NP_794896-MLA44134710145_112020-O.jpg',stock:'20',precio:'190'}]
    //const productos = []

    return (
        <Container sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <DatosVendedor />
            <Container sx={{
                height: '500px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                borderRadius: '10px',
            }}>
                <Container sx={{
                    height: '70px',
                    margin: '5px 0',
                    display: 'flex',
                    borderBottom: '2px solid black',
                    alignItems: 'center',
                }}>
                    <Typography variant="h6">
                        TUS PRODUCTOS
                    </Typography>
                    <Button variant="contained" color="info" sx={{
                        left: '760px',
                        fontWeight: '600',
                    }}>
                      Agregar
                    </Button>
                </Container>
                <Container sx={{
                height: '335px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'auto',
                borderRadius: '10px',
            }}>
                {productos.length ? productos.map(producto => <CardVendedor 
                                            nombre={producto.nombre}
                                            marca={producto.marca}
                                            urlImg={producto.urlImg}
                                            stock={producto.stock || "Sin Stock"}
                                            precio={producto.precio}
                                            />) : <Typography variant='h5' sx={{margin: 'auto'}}>
                                                    NO HAY PRODUCTOS
                                                </Typography>}
                </Container>
            </Container>
        </Container>
    )
}