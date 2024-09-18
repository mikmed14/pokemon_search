"use client";

import "./module.css";
import logo from './poke_image.png';

import React from "react";
import { useState } from 'react';
import { MantineProvider } from "@mantine/core";

function PokemonSearch() {

  

  const [inputValue, setInputValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    
  }

  const [data, setData] = useState(null);

  function handleClick(event: React.MouseEvent<HTMLElement>, poke_name: String){

    // Creating Our XMLHttpRequest object 
    let xhr = new XMLHttpRequest();

    // Making our connection  
    let url= "https://pokeapi.co/api/v2/pokemon/"+poke_name+"/";
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        if (poke_name=="" || poke_name==null || poke_name==undefined){
          setData(null);
        }
        else{
          setData(JSON.parse(xhr.responseText));
        }

        
      }

    }

    xhr.send();
  }

  function check(){
    
    //alert(data);
    console.log(data);
    if (data==null){
      return null;
    }
    else {

      return <div className="poke_table_contaoner"><table>
        <tbody>
        <tr>
          <td><b>Name:</b></td>
          <td>{data["name"]}</td>
        </tr>
        <tr>
          <td><b>Base experience:</b></td>
          <td>{data["base_experience"]}</td>
        </tr>
        <tr>
          <td><b>Abilities:</b></td>
          <td>{data["abilities"]["0"]["ability"]["name"]} , {data["abilities"]["1"]["ability"]["name"]}</td>
        </tr>
        <tr>
          <td><b>Height:</b></td>
          <td>{data["height"]}</td>
        </tr>
        <tr>
          <td><b>Weight:</b></td>
          <td>{data["weight"]}</td>
        </tr>  
        </tbody>        
        </table>
        </div>;
    }
  }

  return (   
      <div className="poke_container">
    
        <div className="poke_main">
          <img src={logo.src} />

          <div className="poke_title">
            <h1><b>POKEMON SEARCH</b></h1>
          </div>

          <div className="poke_search_container"> 

                <div className="poke_input_container">
                  <input type="text" className="poke_input" onChange={handleChange}></input>  
                </div>  

                <div className="poke_button_container">
                  <button type="button" className="poke_button" onClick={(e) => handleClick(e, inputValue)} >Search</button>
                </div>

          </div>

          {check()}

        </div>

      </div>
  );

}


function MyApp() {
  return (
    <MantineProvider>
      <PokemonSearch/>
    </MantineProvider>
  );
}


export default MyApp;

