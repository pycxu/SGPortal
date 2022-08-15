import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import * as style from './style.module.scss'

export default function AppFooter() {
  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.logoContainer}>
          <LazyLoadImage alt='' src='/images/Logo_SOG_Colour.png' className={style.img} />
        </div>
        <div className={style.verticalSpace} />
        <div className={style.text2}>
          <Link to='/about/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            about
          </Link>
          &nbsp;|&nbsp;
          <Link
            to='/help/'
            state={{ showContact: true }}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          >
            contact
          </Link>
          &nbsp;|&nbsp;
          <Link to='/terms/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            terms
          </Link>
          &nbsp;|&nbsp;
          <Link to='/privacy/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            privacy
          </Link>
        </div>
        <div className={style.verticalSpace} />
        <div className={style.text1}>
          <div style={{ marginTop: 10, fontSize: '14px' }}>
            Stay or Go Pty Ltd (“Stay or Go”) provides information about and compares credit
            products in the Australian market and is authorised to do so as the holder of Australian
            Credit Licence 527092. We do not compare every credit product in the Australian market.
            We are not a credit provider and we do not provide credit assistance. When we provide
            information via this website, we are not providing you with a recommendation or
            suggestion about a particular credit product. When you apply for a credit product via
            our website, you are not applying with us, you are applying directly with the credit
            provider and will be redirected to their website. We endeavour to ensure that the
            information on this website is current and accurate however, before entering into any
            credit product with a credit provider displayed on our website, you should confirm the
            fees, rates, product information, and eligibility criteria with the credit provider and
            read the Target Market Determination (TMD) available via their website. All information
            on this website is general advice only and does not take into account your objectives,
            financial situation or needs. You should consider whether this advice is right for you
            and we encourage you to seek independent financial advice. The use of any trade name or
            trademark on this website is for identification, comparison and reference purposes only
            and does not imply any association with the trademark holder or their brand. Please
            refer to our{' '}
            <Link to='/terms/' style={{ color: '#4f8ccc', textDecoration: 'inherit' }}>
              Terms of Use{' '}
            </Link>
            for more details.
          </div>
        </div>
        <div className={style.verticalSpace} />
        <div className={style.text2}>Copyright © {new Date().getFullYear()} Stay or Go Pty Ltd</div>
      </div>
    </div>
  )
}
