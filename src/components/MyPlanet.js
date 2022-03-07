import React from 'react'
import { Planet } from 'react-planet';
import { Object } from './Object';
import logo from '../images/logo.png'

export function MyPlanet() {
	return (
		<Planet
			centerContent={
				<img src= { logo } alt="Hi"
					style={{
						height: "100%",
						width: "100%",
						borderRadius: '50%',
						backgroundColor: '#1da8a4',
					}}
				/>
			}
			open
			autoClose
			orbitRadius={200}
		>
			<Object />
			<div
				style={{
					height: "5em",
					width: "10em",
					backgroundColor: "#fff5ae",
				}}
			/>
			<div
				style={{
					height: "5em",
					width: "10em",
					backgroundColor: "#fff5ae",
				}}
			/>
		</Planet>
	);
}