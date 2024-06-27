import { useContext } from 'react';
import '../css/premium_ad.css';
import { ContextAd } from '../StatContext';
import { InitialPremiumState } from '../initialValue';

export default function PremiumCont() {

    const ad_state = useContext(ContextAd);

    const toggle_adwall = () => {
        ad_state?.set({ display: true, page: 1 });
    }
    return (
        <div id="premium" onClick={toggle_adwall}>
            <p >Check out Premium HHR Bot Features here!</p>
        </div>
    )
}

export function PremiumBGDarken() {
    const ad_state = useContext(ContextAd);

    if (ad_state!.get.display) {
        return (<div className='premium-adwall-bg'></div>);
    }
    else {
        return <></>;
    }
}

export function PremiumDetail() {
    const ad_state = useContext(ContextAd);
    const Close = () => {
        ad_state?.set(InitialPremiumState);
    }

    const Proceed = () => {
        ad_state?.set({ display: true, page: 2 })
    }

    if (ad_state!.get.display) {
        return (
            <div className="premium-adwall-cont">
                <div className="close-button" id='close-button-p' onClick={Close}></div>
                <div className='layer-2'>
                    {(ad_state!.get.page == 1) ? (
                        <>
                            <div className="basic-cont">
                                <p>BASIC</p>
                                <div className='cost-text'>
                                    <p >free</p>
                                </div>
                                <p className='basic-text'>all the generic commands like:</p>
                                <div>
                                    <p className='basic-text'>/xp</p>
                                    <p className='basic-text'>/info</p>
                                    <p className='basic-text'>/guild</p>
                                    <p className='basic-text'>/items</p>
                                    <p className='basic-text'>/player</p>
                                    <p className='basic-text'>/leaderboard</p>
                                </div>

                            </div>
                            <div className="premium-cont">

                                <p id='premium-text'>PREMIUM</p>
                                <div className='cost-text'>
                                    <p>$4.99</p><p className='basic-text'>per month</p>
                                </div>
                                <div className='premium-detail'>
                                    <p className='pfont1'>• includes everything in basic</p>
                                    <p className='pfont1'>• guild weekly contribution checker</p>
                                    <p className='pfont1'>• guild members leaderboard</p>
                                    <p className='pfont1'>• improved generic commands</p>
                                    <p className='pfont2'>• also includes future features</p>
                                    <p className='pfont2'>• supports us!</p>
                                </div>


                                <div className='premium-start' onClick={Proceed}>
                                    <p>GET STARTED</p>
                                </div>
                            </div>
                        </>
                    ) : (<>
                        <div className='paythrough-cont'>
                            <div className='paythrough-info'>
                                <div className='paythrough-div'>
                                    <p> Pay Through </p>
                                    <div className='paypal-div'>
                                        <p id='price'> $4.99</p>
                                        <a href='https://www.paypal.me/AlexCorj'></a>

                                    </div>

                                </div>
                                <br></br>

                                <p> And DM <span>A3lx</span> on our Official Discord Link</p>
                                <div className='discord-div'>
                                    <a className='discord-button' href='https://discord.com/invite/BPGmpJbXR2'> HHR SUPPORT BOT </a>
                                </div>
                                <hr></hr>
                                <p>Why PREMIUM?</p>
                                <br></br>
                                <p className='premium-detail-text'>• Best for guild leaders</p>
                                <p className='premium-detail-text'>• Weekly contribution monitoring </p>
                                <p className='premium-detail-text'>• Automatic strikes counter </p>
                                <p className='premium-detail-text'>• Better generic commands </p>
                                <p className='premium-detail-text'>• Supports developers for both hhr bot and statlab</p>
                            </div>

                        </div>
                    </>)}
                </div>
            </div>

        )
    }
    else {

        return (<></>)
    }
}





// export default function CloseButton(){
//     const ui_state = useContext(ContextStates);
//     const Close = ()=>{
//         ui_state?.set(ui => ({ ...ui, page: "main" }));
//     }
//     return (
//         <div className="close-button" onClick={Close}></div>
//     )