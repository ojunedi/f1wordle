import React, { useEffect, useState } from 'react'

interface KeyPadProps {
  usedKeys: object
}

export const Keypad = ({ usedKeys }: KeyPadProps) => {

  const [letters, setLetters] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/letters')
    .then(res => res.json())
    .then(json => {
        setLetters(json)
    })
  }, [setLetters])


  return (
    <div className="keypad">
        {letters && letters.map((letter) => {
            const color = usedKeys[letter.key]
            return (
                <div key={letter.key} className={color}>{letter.key}</div>
            )
        })}
    </div>
  )
}
