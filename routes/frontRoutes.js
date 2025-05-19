import express from 'express';
import { getProverbs,addProverb } from '../utils/helperFiles.js';
import axios from 'axios';


const router = express.Router();

//export default (upload) =>{

    router.get('/',async(req,res)=>{
        try{
         //const allProverbs = request.body;
         const response = await axios.get(`https://afghan-proverb-api-km5d.onrender.com/`);
         const proverbs = response.data; 
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

    router.get('/proverbs/add',(req,res)=>{
        res.render('add.ejs')
    })

    router.post('/proverbs', async(req,res)=>{
       // const action = req.body.action;
        try{
            const newProverb = req.body;

            const response = await axios.post(`https://afghan-proverb-api-km5d.onrender.com/proverbs`, newProverb);
        
            if(response.status === 200 ){
                //res.render('index.ejs');
                 res.redirect('/');
            }else{
                throw new Error('failed to create task on other server'); 
            }
        }catch(err){
            console.log('failed to create task', err.message);
            res.status(500).send('failed to create task');
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
     
        try{
            const updateProverb = req.body;
            const {id} = req.params; 
            const response = await axios.put(`https://afghan-proverb-api-km5d.onrender.com/proverbs/${id}`, updateProverb ); 

            if(response.status === 200){
                res.redirect('/proverbs/${id');
               // res.render('show.ejs', {proverbs: response.data}); use one of them bro
            }else{
                throw new Error('failed to update proverb'); }
        
        } catch(err){
           console.log('failed to update', err.message);
           res.status(500).send('failed to update') 
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

    router.get('/proverbs/random', async(req,res)=>{
        try{
            //const randomProbverb = req.body;
            const response = await axios.get(`https://afghan-proverb-api-km5d.onrender.com/random`);
            const proverb = response.data;
            res.render('show.ejs', {proverbs: proverb});
            
        }catch(err){
            res.render('error',
                {message: 'failed to get a rondom one',
                    error: errpr.message
                }
            )
        }

    })

export default router; 
