"use client";

import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiUpload } from "react-icons/fi";
import ModeToggle from '@/components/Toggle';
import { AiFillHome } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaLink } from "react-icons/fa";

export const runtime = 'edge';

const Try = () => {
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [amazonLink, setAmazonLink] = useState<string>('');
    const [shareableLink, setShareableLink] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Ref for the file input
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result as string;
                setImagePreview(base64data);
                setShareableLink(base64data);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAmazonLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(amazonLink === '') {
            
        }
        setAmazonLink(event.target.value);
    };

    const handleProcessImages = async () => {
        setLoading(true);
        if (amazonLink && shareableLink) {
            try {
                const response = await fetch('https://try-outfit-backend.arre-ankit.me/process-images', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amazon_img_url: amazonLink,
                        model_img_url: shareableLink,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const responseUrl = data[0]?.url;
                        setImageUrl(responseUrl || null);
                        setLoading(false);
                    }
                } else {
                    console.error('Error fetching data from API');
                }
            } catch (error) {
                console.error('Error calling API:', error);
            }
        } else {
            console.log('Both Amazon and model image links are required');
        }
    };

    const handleDownload = (imageUrl: string) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'image.png';
        link.click();
    };

    const handleCopyLink = (imageUrl: string) => {
        navigator.clipboard.writeText(imageUrl).then(() => {
            alert("Image link copied to clipboard");
        });
    };

    return (
        <div>
            <div className='flex justify-between bg-background px-4 py-4'>
                <AiFillHome className='w-7 h-7 cursor-pointer'onClick={()=>router.push("/")} />
                <ModeToggle />
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="max-w-md w-full px-4 sm:px-6">
                <h1 className="text-5xl font-bold text-center mb-6">Try Outfit</h1>
                <p className="text-muted-foreground text-center mb-8">
                    Upload an image and provide an Amazon link, and we'll process it for you.
                </p>
                <div className="bg-card p-6 rounded-lg shadow-lg">
                    <div className="grid gap-6">
                        <div>
                            <Label htmlFor="amazon-link">Amazon Link</Label>
                            <Input
                                id="amazon-link"
                                type="text"
                                value={amazonLink}
                                onChange={handleAmazonLinkChange}
                                placeholder="https://www.amazon.com/..."
                            />
                        </div>
                        <div>
                            <Label>Upload Image</Label>
                            <div
                                className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted rounded-md relative cursor-pointer overflow-hidden"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute w-full h-full opacity-0 cursor-pointer"
                                />
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-fit h-fit " />
                                ) : (
                                    <Button variant="outline" size="icon" className="w-full h-full">
                                    <FiUpload className='flex justify-center items-center w-10 h-10' />
                                        <div className="w-8 h-8 text-muted-foreground" />
                                        <span className="sr-only">Upload image</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                        {loading ? (
                            <Button size="lg" className="w-full" disabled>
                                Processing...
                            </Button>
                        ) : (
                            <Button size="lg" className="w-full" onClick={handleProcessImages}>
                                Process Images
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            
            <div className="flex justify-center mt-8 w-full px-4 sm:px-6">
                <div className="flex w-full max-w-xl gap-4">
                    {imagePreview && (
                    <Card className="relative w-full max-w-sm overflow-hidden rounded-lg">
                        <img
                        src={imagePreview}
                        width="600"
                        height="400"
                        alt="Uploaded Image"
                        className="h-[400px] w-full object-cover"
                        style={{ aspectRatio: "600/400", objectFit: "cover" }}
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(imagePreview)}>
                            <MdOutlineFileDownload className="h-4 w-4" />
                        </Button>
                        </div>
                    </Card>
                    )}

                    {imageUrl && (
                    <Card className="relative w-full max-w-md overflow-hidden rounded-lg">
                        <img
                        src={imageUrl}
                        width="600"
                        height="400"
                        alt="Processed Image"
                        className="h-[400px] w-full object-cover"
                        style={{ aspectRatio: "600/400", objectFit: "cover" }}
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="sm"  onClick={() => handleDownload(imageUrl)} >
                            <MdOutlineFileDownload className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleCopyLink(imageUrl)} >
                            <FaLink className="h-4 w-4" />
                        </Button>
                        </div>
                    </Card>
                    )}
                </div>
            </div>
        </div>
    </div>
    );
};

export default Try;
