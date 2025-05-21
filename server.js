import express from 'express';
import methodOverride from 'method-override';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import frontRoutes from './routes/frontRoutes.js'; 


const app = express();
const PORT= process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
//app.use(express.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));


app.use(methodOverride('_method'));


app.use('/', frontRoutes);

app.listen(PORT, (req,res)=>{
    console.log('app is runing on port '+PORT);
});





