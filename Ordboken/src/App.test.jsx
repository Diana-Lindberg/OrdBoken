import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { describe, expect, test } from 'vitest';

describe (' App', () =>{
  //Kollar så sidan laddas och att sökfält och knapp finns på sidan
  test ('Renderar sökfält och knapp', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Skriv in ett ord');
    const button = screen.getByText('Sök');
    expect (input).toBeInTheDocument();
    expect (button).toBeInTheDocument();
  });

  //Trycker man på knappen sök med tomt fält så visas ett felmeddelande
  test ('Visar felmeddelanden när man söker med tomt fält', () => {
    render(<App />);
    const button = screen.getByText('Sök');
    fireEvent.click(button);
    const errorMessage = screen.getByText('Fyll i sökfält');
    expect(errorMessage).toBeInTheDocument();
  });

  //Simulerar en sökning med ett mockat anrop och ska då visa ord, betydelse och ljudknapp
  test ('Visar sökt ord, definition och ljudfil', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Skriv in ett ord');
    const button = screen.getByText('Sök');

    fireEvent.change(input, {target: { value: 'test'}});
    fireEvent.click(button);

   await waitFor (() => {
    expect(screen.getByText('test')).toBeInTheDocument();
     expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBeInTheDocument();
     expect(screen.getByText('Lyssna')).toBeInTheDocument();
   });
  })

  //Söker man ett ord som inte finns kommer ett felmeddleande upp
  test ('Visar felmeddelande när ordet inte finns', async () => {
    render (<App />);
    const input = screen.getByPlaceholderText('Skriv in ett ord');
    const button = screen.getByText('Sök');

    fireEvent.change(input, {target: { value: 'ogilitigt'}});
    fireEvent.click(button);

    await waitFor (() => {
      expect(screen.getByText('Ordet hittades inte')).toBeInTheDocument();
    });
  });


 
});

