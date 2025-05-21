import express from 'express';
import { getProverbs,addProverb } from '../utils/helperFiles.js';
import axios from 'axios';




const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//export default (upload) =>{

    router.get('/', async(req,res)=>{
        try{
         //const allProverbs = request.body;
         const response = await axios.get(`https://afghan-proverb-api-km5d.onrender.com/proverbs`);
         const proverbs = response.data; 
         console.log(Array.isArray(proverbs));
         res.render('index.ejs',{proverbs}); 
        }
        catch(err){
            res.render('error',{
                message: 'Failed to load proverbs',
                error: err.message,
            });
        }
    });
   


    router.get('/proverbs/:id', async(req,res)=>{
            const {id} = req.params; 
            try{
                const response = await axios.get(`https://afghan-proverb-api-km5d.onrender.com/proverbs/${id}`);
                const result = response.data;
                res.render("show.ejs", {proverbs: result});
            }
            catch(err){
                console.log("failed to get proverb:", err.message);
                res.render("error",{message: 'could not load proverb',error: err.message});
            }
    });



    ////////////////////////showing the add page and submiting /////////////////////

        router.get('/proverbs/add', (req, res) => {
        res.render('add.ejs');
        });


        router.post('/proverbs', async (req, res) => {
    try {
        console.log('Form body: ', req.body);
        const newProverb = req.body;

        const response = await axios.post('https://afghan-proverb-api-km5d.onrender.com/proverbs', newProverb);

        if (response.status === 200) {
        res.redirect('/');
        } else {
        throw new Error('Failed to create proverb on external server');
        }
    } catch (err) {
        console.log('Failed to create proverb:', err.message);
        res.status(500).render('error', {
        message: 'Failed to create proverb',
        error: err.message
        });
    }
    });


    /////////////////////////editing page/////////////////////////
    router.get('/proverbs/:id/edit', async(req,res)=>{
        const {id} = req.params;
        try{
            const response = await axios.get(`https://afghan-proverb-api-km5d.onrender.com/proverbs/${id}`);
            const result = response.data; 
            res.render('edit.ejs',{proverb : result});
        }catch(err){
            console.log('Error in loading the edit form: ', err.message);
            res.render('error',{message: 'could not load edit form', 
                error: err.message });
        }
    });


    router.put('/proverbs/:id', async(req,res)=>{
         const {id} = req.params; 
         // const id = req.params.id; 
         const updateProverb = req.body;

        console.log("Form data submitted:", updateProverb);

        try{//JSON.stringify(newProverb)
            
            const response = await axios.put(`https://afghan-proverb-api-km5d.onrender.com/proverbs/${id}`, updateProverb ); 

            console.log("API PUT response is :", response.data);


            if(response.status === 200){
               return res.redirect(`/proverbs/${id}`);
                //return res.redirect('/proverbs');
               // res.render('show.ejs', {proverbs: response.data}); use one of them bro
            }else{
                throw new Error('failed to update proverb'); }
        
        } catch(err){
           console.log('failed to update ', err.message);
           res.status(500).send('failed to update ') 
        }
    });


    router.delete('/proverbs/:id', async (req,res)=>{
        try{
            //const deleteProverb = request.body;
            const {id} = req.params;
            const response = await axios.delete(`https://afghan-proverb-api-km5d.onrender.com/proverbs/${id}`); 
            res.redirect('/');    
        }catch(err){
            console.log('failed to delete!', err.message);
            res.status(500).send('failed to update ');

        }
    });

    router.get('/proverbs/random', async (req, res) => {
    try {
        const response = await axios.get(`https://afghan-proverb-api-km5d.onrender.com/random`);
        const proverb = response.data;
        res.render('show.ejs', { proverbs: proverb });
    } catch (err) {
        res.render('error', {
        message: 'failed to get a random one',
        error: err.message
        });
    }
    });


export default router; 
