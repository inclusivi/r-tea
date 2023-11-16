'use client';

import { Box, Typography } from "@mui/material";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { LinearLoader } from "@/components/loading/LinearLoader";

interface ImageDropperProps {
	image: string | StaticImport | undefined;
	loading: boolean
	onDrop: (acceptedFile: File) => void;
}

export default function ImageDropper(props: ImageDropperProps) {

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
		maxFiles: 1,
		onDrop: (acceptedFiles) => {
			props.onDrop(acceptedFiles[0]);
		}
	});

	const loading = props.loading;
	const showImage = props.image && !loading && !isDragActive;
	const backgroundColor = isDragActive ? '#d0ffd0' : showImage ? 'transparent' : '#d0d0d0';
	const textBackground = showImage ? 'rgba(255,255,255,0.5)' : 'transparent';
	const instructions = isDragActive ? 'Solte o arquivo aqui.' : 'Arraste um arquivo aqui ou clique para selecionar.'

	return (
		<Box {...getRootProps()} sx={{ borderRadius: 1, borderColor: 'divider', height: 120, width: '100%', backgroundColor: backgroundColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }} position='relative'>
				{props.image && showImage && (<Image src={props.image} alt='Imagem' fill style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />)}
				<input {...getInputProps()} />
				{
					loading
						? (<LinearLoader />)
						: (
							<Typography position='relative' sx={{ borderRadius: 1, p: 1, backgroundColor: textBackground }} textAlign='center'>
								{instructions}
							</Typography>
						)
				}

			</Box>
		);
};