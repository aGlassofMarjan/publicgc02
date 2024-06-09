// import { useState } from 'react';

export default function Navbar(){

    return (
        <nav className="flex justify-center p-5 shadow-lg">
            <div className="flex row gap-2 font-semibold">
                <div className="mr-10">
                    <img
                        className="w-14"
                        src="https://d2vuyvo9qdtgo9.cloudfront.net/assets/img/brand/logo_mcd.png"
                        alt=""
                    />
                </div>
                <ul className="flex justify-between items-center gap-6">
                    <li>
                        <div className="items-center relative inline-block">
                            <div className='flex items-center hover:text-yellow-500'>
                                <p>Menu</p>
                            </div>
                        </div>
                    </li>
                    <a>
                        <li className="items-center hover:text-yellow-500"><span>Promo</span></li>
                    </a>
                    <li>
                        <img
                            className="w-20"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGX0DoX_459CN_RBFBAGsxuiiKFv9_62uvZjQhPktSDEt_ohaZsJNrDFWsBqfHK1Ayv1s&usqp=CAU"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            className="w-24"
                            src="https://www.mcdonalds.co.id/assets/img/movieclub/img_movieclub-1.webp"
                            alt=""
                        />
                    </li>
                    <li className="items-center hover:text-yellow-500">Dunia Anak</li>
                    <li className="items-center hover:text-yellow-500">Berita Terkini</li>
                    <li className="items-center hover:text-yellow-500">
                        Pahlawan di <br /> sekitar kita
                    </li>
                    <li className="items-center hover:text-yellow-500 pr-5" style={{ borderRight: 'solid 1px #dadada' }} >
                        Makin Kenal <br /> Makin Sayang
                    </li>
                    <a href="https://www.google.com/maps/search/mcdonald's/@-6.2278237,106.6245429,12.5z?entry=ttu" target="_blank" className="items-center hover:text-yellow-500" >
                        <span className="ml-3">Lokasi</span>
                    </a>
                </ul>
                
            </div>
        </nav>
    );
}