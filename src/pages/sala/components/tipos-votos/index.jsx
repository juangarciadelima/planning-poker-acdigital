import React from 'react'
import { List, ListItem } from '@chakra-ui/react'

export function TiposVotos({ votos }){

  const listaVotos = votos.reduce((votoA, votoB) => {
    const existingIndex = votoA.findIndex(
      carta => carta.valor === votoB.carta.valor 
    )
    if (existingIndex > -1) {
      votoA[existingIndex].total += 1
    } else {
      votoA.push({
        valor: votoB.carta.valor,
        total: 1
      })
    }
    return votoA
  }, [])

  return <>
        <List spacing={3} style={{ marginTop: '30px', fontSize: '20px'}}>
          { listaVotos.length > 0 && listaVotos.map(voto => 
               <ListItem>
                 Valor Carta : { voto.valor } - Total Votos : { voto.total }
               </ListItem>
          )}
        </List>
 </>
}