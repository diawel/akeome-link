import { ImageResponse } from 'next/og'
import { NextResponse } from 'next/server'
import { getSharedCard } from '../../../utils/strapi/card'
import fs from 'fs'
import path from 'path'

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const shareId = searchParams.get('shareId')

  if (!shareId) {
    return NextResponse.json(
      { error: 'ShareId parameter is required' },
      { status: 400 }
    )
  }

  const card = await getSharedCard(shareId)
  if (!card) {
    return NextResponse.json({ error: 'Card not found' }, { status: 404 })
  }

  const fontData = await fs.readFileSync(path.join(process.cwd(), 'public/fonts/03SmartFontUI.ttf'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_422_2528)">
            <path d="M1200 -10H0V647H1200V-10Z" fill="#D11717" />
            <g filter="url(#filter0_d_422_2528)">
              <path
                d="M1110.27 57H85.73C78.9756 57 73.5 62.4756 73.5 69.23V651.77C73.5 658.524 78.9756 664 85.73 664H1110.27C1117.02 664 1122.5 658.524 1122.5 651.77V69.23C1122.5 62.4756 1117.02 57 1110.27 57Z"
                fill="#F2F2F2"
              />
            </g>
            <path
              d="M345.71 115H137.29C134.921 115 133 116.921 133 119.29V371.71C133 374.079 134.921 376 137.29 376H345.71C348.079 376 350 374.079 350 371.71V119.29C350 116.921 348.079 115 345.71 115Z"
              fill="#CC0000"
            />
            <path
              d="M240.14 469.63V503.68"
              stroke="#CC0000"
              stroke-width="69"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M207.51 493.38L239.89 503.9"
              stroke="#CC0000"
              stroke-width="69"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M239.98 503.77L272.05 492.35"
              stroke="#CC0000"
              stroke-width="69"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M241.01 504.5L263.51 530.52"
              stroke="#CC0000"
              stroke-width="69"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M239.1 505.24L219.08 531.09"
              stroke="#CC0000"
              stroke-width="69"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M302.51 524.6C297.66 527.07 270.54 542.97 250.06 528.39C245.33 525.02 231.4 516.41 233.97 508.79C235.83 503.27 241.99 500.48 247.34 500.53C256.82 500.62 266.81 510.64 267.08 518.87C267.16 521.29 266.4 526.36 260.27 526.36"
              stroke="#F2F2F2"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M178 524.44C182.85 526.91 209.97 542.81 230.45 528.23C235.18 524.86 249.11 516.25 246.54 508.63C244.68 503.11 238.52 500.32 233.17 500.37C223.69 500.46 213.7 510.48 213.43 518.71C213.35 521.13 214.11 526.2 220.24 526.2"
              stroke="#F2F2F2"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M191.4 594.51H182.13C181.44 594.51 180.91 594.74 180.91 595.49V601.8C180.91 602.23 181.27 602.55 181.73 602.55H198.49C199.22 602.55 199.58 602.95 199.58 603.55V604.04C199.58 604.67 199.22 605.04 198.49 605.04H180.28C178.93 605.04 177.9 604.12 177.9 603V594.5C177.9 592.95 179.15 592.06 180.74 592.06H191.26C195.45 592.06 196.77 590.62 196.77 588.47V587.69C196.77 585.48 195.02 584.16 191.43 584.16H178.96C178.23 584.16 177.9 583.76 177.9 583.16V582.64C177.9 582.04 178.23 581.66 178.96 581.66H191.3C196.84 581.66 199.81 583.73 199.81 587.6V588.4C199.81 592.48 197.14 594.48 191.4 594.48V594.51Z"
              fill="black"
            />
            <path
              d="M222.87 605.02H219.93C212.64 605.02 210.07 601.6 210.07 596.52V590.15C210.07 585.1 212.64 581.65 219.93 581.65H222.87C230.16 581.65 232.73 585.09 232.73 590.15V596.52C232.73 601.6 230.16 605.02 222.87 605.02ZM229.83 590.18C229.83 585.99 227.39 584.15 222.84 584.15H219.94C215.42 584.15 213.01 585.99 213.01 590.18V596.52C213.01 600.71 215.42 602.52 219.94 602.52H222.84C227.39 602.52 229.83 600.71 229.83 596.52V590.18Z"
              fill="black"
            />
            <path
              d="M256.75 594.51H247.48C246.79 594.51 246.26 594.74 246.26 595.49V601.8C246.26 602.23 246.62 602.55 247.08 602.55H263.84C264.57 602.55 264.93 602.95 264.93 603.55V604.04C264.93 604.67 264.57 605.04 263.84 605.04H245.63C244.28 605.04 243.25 604.12 243.25 603V594.5C243.25 592.95 244.5 592.06 246.09 592.06H256.61C260.8 592.06 262.12 590.62 262.12 588.47V587.69C262.12 585.48 260.37 584.16 256.78 584.16H244.31C243.58 584.16 243.25 583.76 243.25 583.16V582.64C243.25 582.04 243.58 581.66 244.31 581.66H256.65C262.19 581.66 265.16 583.73 265.16 587.6V588.4C265.16 592.48 262.49 594.48 256.75 594.48V594.51Z"
              fill="black"
            />
            <path
              d="M290.1 605.04H276.44C275.71 605.04 275.38 604.64 275.38 604.04V603.52C275.38 602.92 275.71 602.54 276.44 602.54H290.3C293.9 602.54 295.28 600.56 295.28 598.55V597.95C295.28 595.65 294.06 593.7 290.13 593.7H278.65C276.6 593.7 275.38 592.52 275.38 590.74V583.68C275.38 582.53 276.4 581.61 277.72 581.61H295.93C296.62 581.61 296.95 582.01 296.95 582.59V583.16C296.95 583.76 296.59 584.11 295.89 584.11H279.1C278.6 584.11 278.24 584.45 278.24 584.88V590.05C278.24 590.88 278.7 591.26 279.59 591.26H290.08C295.33 591.26 298.26 593.18 298.26 597.98V598.53C298.26 602.43 295.46 605.04 290.08 605.04H290.1Z"
              fill="black"
            />
            <path
              d="M623.44 178.33C624.96 178.33 626.19 179.56 626.19 181.08V257.25C626.19 258.77 624.96 260 623.44 260H572.44C570.92 260 569.69 258.77 569.69 257.25V181.08C569.69 179.56 570.92 178.33 572.44 178.33H623.44ZM623.44 175.33H572.44C569.26 175.33 566.69 177.9 566.69 181.08V257.25C566.69 260.43 569.26 263 572.44 263H623.44C626.62 263 629.19 260.43 629.19 257.25V181.08C629.19 177.9 626.62 175.33 623.44 175.33Z"
              fill="#CC0000"
            />
            <path
              d="M696.57 178.33C698.09 178.33 699.32 179.56 699.32 181.08V257.25C699.32 258.77 698.09 260 696.57 260H645.57C644.05 260 642.82 258.77 642.82 257.25V181.08C642.82 179.56 644.05 178.33 645.57 178.33H696.57ZM696.57 175.33H645.57C642.39 175.33 639.82 177.9 639.82 181.08V257.25C639.82 260.43 642.39 263 645.57 263H696.57C699.75 263 702.32 260.43 702.32 257.25V181.08C702.32 177.9 699.75 175.33 696.57 175.33Z"
              fill="#CC0000"
            />
            <path
              d="M769.71 178.33C771.23 178.33 772.46 179.56 772.46 181.08V257.25C772.46 258.77 771.23 260 769.71 260H718.71C717.19 260 715.96 258.77 715.96 257.25V181.08C715.96 179.56 717.19 178.33 718.71 178.33H769.71ZM769.71 175.33H718.71C715.53 175.33 712.96 177.9 712.96 181.08V257.25C712.96 260.43 715.53 263 718.71 263H769.71C772.89 263 775.46 260.43 775.46 257.25V181.08C775.46 177.9 772.89 175.33 769.71 175.33Z"
              fill="#CC0000"
            />
            <path
              d="M842.84 177.33C844.91 177.33 846.59 179.01 846.59 181.08V257.25C846.59 259.32 844.91 261 842.84 261H791.84C789.77 261 788.09 259.32 788.09 257.25V181.08C788.09 179.01 789.77 177.33 791.84 177.33H842.84ZM842.84 175.33H791.84C788.66 175.33 786.09 177.9 786.09 181.08V257.25C786.09 260.43 788.66 263 791.84 263H842.84C846.02 263 848.59 260.43 848.59 257.25V181.08C848.59 177.9 846.02 175.33 842.84 175.33Z"
              fill="#CC0000"
            />
            <path
              d="M915.98 177.33C918.05 177.33 919.73 179.01 919.73 181.08V257.25C919.73 259.32 918.05 261 915.98 261H864.98C862.91 261 861.23 259.32 861.23 257.25V181.08C861.23 179.01 862.91 177.33 864.98 177.33H915.98ZM915.98 175.33H864.98C861.8 175.33 859.23 177.9 859.23 181.08V257.25C859.23 260.43 861.8 263 864.98 263H915.98C919.16 263 921.73 260.43 921.73 257.25V181.08C921.73 177.9 919.16 175.33 915.98 175.33Z"
              fill="#CC0000"
            />
            <path
              d="M989.11 177.33C991.18 177.33 992.86 179.01 992.86 181.08V257.25C992.86 259.32 991.18 261 989.11 261H938.11C936.04 261 934.36 259.32 934.36 257.25V181.08C934.36 179.01 936.04 177.33 938.11 177.33H989.11ZM989.11 175.33H938.11C934.93 175.33 932.36 177.9 932.36 181.08V257.25C932.36 260.43 934.93 263 938.11 263H989.11C992.29 263 994.86 260.43 994.86 257.25V181.08C994.86 177.9 992.29 175.33 989.11 175.33Z"
              fill="#CC0000"
            />
            <path
              d="M1062.25 177.33C1064.32 177.33 1066 179.01 1066 181.08V257.25C1066 259.32 1064.32 261 1062.25 261H1011.25C1009.18 261 1007.5 259.32 1007.5 257.25V181.08C1007.5 179.01 1009.18 177.33 1011.25 177.33H1062.25ZM1062.25 175.33H1011.25C1008.07 175.33 1005.5 177.9 1005.5 181.08V257.25C1005.5 260.43 1008.07 263 1011.25 263H1062.25C1065.43 263 1068 260.43 1068 257.25V181.08C1068 177.9 1065.43 175.33 1062.25 175.33Z"
              fill="#CC0000"
            />
            <path
              d="M773.41 219.37H787.11"
              stroke="#CC0000"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <path
              d="M600.68 141.06H588.59V146.82C588.59 147.41 587.92 148.07 587.07 148.07C586.14 148.07 585.55 147.41 585.55 146.82V141.06H568.9C568.34 141.06 567.68 140.54 567.68 139.74C567.68 138.94 568.35 138.42 568.9 138.42H572.68V130.22C572.68 128.8 573.87 127.65 575.39 127.65H585.55V121.5H575.28C574.69 122.92 571.57 129.31 569.64 129.31C568.86 129.31 568.16 128.58 568.16 127.75C568.16 127.4 568.31 127.13 568.53 126.88C570.53 124.73 572.72 120.98 573.46 117.16C573.57 116.64 574.16 116.12 574.94 116.12C575.98 116.12 576.46 116.92 576.46 117.51L576.2 118.86H599.74C600.33 118.86 600.96 119.35 600.96 120.18C600.96 120.94 600.33 121.5 599.74 121.5H588.58V127.65H599.15C599.71 127.65 600.41 128.21 600.41 129C600.41 129.79 599.71 130.29 599.15 130.29H588.58V138.42H600.67C601.26 138.42 601.89 138.98 601.89 139.74C601.89 140.5 601.26 141.06 600.67 141.06H600.68ZM585.55 130.29H576.58C576.1 130.29 575.69 130.67 575.69 131.16V138.42H585.55V130.29Z"
              fill="black"
            />
            <path
              d="M624.64 125.99H622.23C621.71 125.99 621.15 125.54 621.15 124.88C621.15 124.19 621.71 123.73 622.23 123.73H623.97C625.64 123.73 626.38 123.42 626.38 121.65V120.71C626.38 120.19 626.01 119.88 625.45 119.88H620.3C619.97 122.87 617.67 126.23 614.03 127C613.84 127.03 613.7 127.03 613.55 127.03C612.73 127.03 612.14 126.58 612.14 125.85C612.14 125.29 612.51 124.77 613.22 124.63C615.44 124.14 617.15 122.34 617.48 119.87H613.33C612.81 119.87 612.25 119.42 612.25 118.72C612.25 118.1 612.81 117.64 613.33 117.64H617.52V117.15C617.52 116.53 618.08 116 618.93 116C619.78 116 620.34 116.52 620.34 117.15V117.64H626.42C627.98 117.64 629.16 118.75 629.16 120.18V121.85C629.16 124.87 627.45 125.98 624.64 125.98V125.99ZM644.21 148.21C641.87 148.21 636.35 146.23 634.42 144.91C634.12 144.7 633.97 144.42 633.97 144.08C633.97 143.84 634.08 143.59 634.27 143.39H624.37C624.55 143.6 624.63 143.84 624.63 144.08C624.63 144.43 624.48 144.7 624.22 144.91C622.29 146.26 616.77 148.21 614.39 148.21C613.54 148.21 612.98 147.72 612.98 146.99C612.98 146.4 613.39 145.95 613.94 145.88C616.76 145.57 619.84 144.49 622.1 143.38H616.84C615.32 143.38 614.13 142.27 614.13 140.81V129.77C614.13 128.31 615.32 127.2 616.84 127.2H641.83C643.31 127.2 644.54 128.31 644.54 129.77V140.81C644.54 142.27 643.32 143.38 641.83 143.38H636.56C638.78 144.49 641.86 145.57 644.68 145.88C645.24 145.95 645.64 146.4 645.64 146.99C645.64 147.72 645.08 148.21 644.19 148.21H644.21ZM641.54 130.05C641.54 129.6 641.17 129.22 640.69 129.22H618C617.52 129.22 617.15 129.6 617.15 130.05V131.93H641.55V130.05H641.54ZM641.54 133.94H617.14V136.65H641.54V133.94ZM641.54 138.66H617.14V140.54C617.14 140.99 617.51 141.37 617.99 141.37H640.68C641.16 141.37 641.53 140.99 641.53 140.54V138.66H641.54ZM642.36 125.68H634.83C633.27 125.68 632.09 124.57 632.09 123.14V119.53C632.09 118.14 633.28 116.99 634.83 116.99H642.36C643.88 116.99 645.1 118.14 645.1 119.53V123.14C645.1 124.56 643.88 125.68 642.36 125.68ZM642.4 119.91C642.4 119.46 642.03 119.11 641.51 119.11H635.69C635.17 119.11 634.76 119.46 634.76 119.91V122.76C634.76 123.25 635.17 123.56 635.69 123.56H641.51C642.03 123.56 642.4 123.25 642.4 122.76V119.91Z"
              fill="black"
            />
            <path
              d="M666.76 147H665.54C659.79 147 657.98 143.94 657.98 139.29V118.56C657.98 117.87 658.54 117.41 659.31 117.41H660.01C660.75 117.41 661.27 117.93 661.27 118.56V139.19C661.27 142.45 662.53 144.02 665.94 144.02H666.98C667.61 144.02 668.02 144.4 668.02 145.17V145.86C668.02 146.66 667.5 147.01 666.76 147.01V147ZM688.86 136.62H685.74V140.3C685.74 144.26 683.78 147.21 678.1 147.21H675.39C671.01 147.21 667.86 144.78 667.86 140.23C667.86 136.2 670.79 133.39 675.65 133.39H682.4V123.56H667.9C667.23 123.56 666.68 123.04 666.68 122.34V121.61C666.68 120.95 667.24 120.43 667.9 120.43H682.4V117.93C682.4 117.37 682.92 116.99 683.7 116.99H684.4C685.29 116.99 685.73 117.41 685.73 117.93V120.43H688.77C689.47 120.43 689.99 120.95 689.99 121.61V122.34C689.99 123.03 689.47 123.56 688.77 123.56H685.73V133.53H688.85C689.52 133.53 690.04 134.05 690.04 134.78V135.4C690.04 136.09 689.52 136.62 688.85 136.62H688.86ZM682.41 136.37H675.77C672.36 136.37 670.91 138.04 670.91 140.26C670.91 143.11 672.65 144.36 675.47 144.36H677.84C681.18 144.36 682.4 142.8 682.4 140.37V136.38L682.41 136.37Z"
              fill="black"
            />
            <path
              d="M719.3 147.31H715.15C714.48 147.31 713.96 146.75 713.96 146.06V145.5C713.96 144.84 714.44 144.25 715.15 144.25H719.04C722.71 144.25 724.05 142.86 724.05 139.94V131.08C724.05 126.36 722.72 124.59 717.19 124.59H709.37L708.15 146.3C708.11 146.96 707.59 147.41 706.85 147.41H706.18C705.51 147.41 704.85 147.06 704.88 146.37L706.1 124.59H702.98C702.35 124.59 701.94 124.1 701.94 123.37V122.71C701.94 121.95 702.46 121.46 703.13 121.46H706.25L706.47 117.81C706.51 117.15 706.99 116.77 707.73 116.77H708.4C709.14 116.77 709.77 117.12 709.73 117.74L709.51 121.46H717.04C724.72 121.46 727.31 124.1 727.31 131.18V140.18C727.31 144.8 725.05 147.3 719.3 147.3V147.31ZM734.88 118.9H728.76C728.31 118.9 727.94 118.48 727.94 117.93C727.94 117.38 728.31 116.96 728.76 116.96H734.88C735.33 116.96 735.7 117.38 735.7 117.93C735.7 118.48 735.33 118.9 734.88 118.9ZM734.88 122.41H728.76C728.31 122.41 727.94 122.03 727.94 121.44C727.94 120.88 728.31 120.5 728.76 120.5H734.88C735.33 120.5 735.7 120.88 735.7 121.44C735.7 122.03 735.33 122.41 734.88 122.41ZM733.39 140.75H732.91C732.17 140.75 731.58 140.37 731.58 139.67V125.5C731.58 124.81 732.17 124.35 732.91 124.35H733.39C734.13 124.35 734.72 124.8 734.72 125.5V139.67C734.72 140.36 734.13 140.75 733.39 140.75Z"
              fill="black"
            />
            <path
              d="M777.93 129.53H771.7L771.74 133.77C771.74 135.23 770.48 136.37 768.92 136.37H754.35C751.68 136.37 749.83 138.07 749.83 140.4C749.83 143.04 751.61 144.43 754.35 144.43H775.45C776.15 144.43 776.64 144.99 776.64 145.65V146.07C776.64 146.8 776.16 147.32 775.45 147.32H753.94C749.56 147.32 746.52 144.92 746.52 140.51C746.52 136.66 749.64 133.7 753.9 133.7H767.4C767.96 133.7 768.4 133.32 768.4 132.76L768.36 129.53H749.15C748.48 129.53 748 128.97 748 128.25V128.08C748 127.39 748.48 126.86 749.15 126.86H768.32L768.25 122.55H749.15C748.48 122.55 748 122.03 748 121.3V121.13C748 120.47 748.48 119.91 749.15 119.91H768.21V117.83C768.21 117.34 768.73 116.79 769.54 116.79H770.28C771.1 116.79 771.54 117.38 771.54 117.8L771.58 119.92H777.92C778.59 119.92 779.07 120.44 779.07 121.14V121.38C779.07 122.07 778.59 122.56 777.92 122.56H771.62L771.66 126.87H777.93C778.6 126.87 779.08 127.39 779.08 128.09V128.33C779.08 129.02 778.6 129.55 777.93 129.55V129.53Z"
              fill="black"
            />
            <path
              d="M393.69 441.56L390.5 438C395.78 432.6 398.85 425.29 400.45 417.92L404.93 418.9C404.38 420.86 403.89 422.71 403.33 424.61H437.22V428.48H419.78V438.37H434.88V442.24H419.78V453.91H440.72V457.9H419.78V472.7H415.24V457.9H389.76V453.91H399.52V438.37H415.24V428.48H401.86C399.96 433.21 397.13 437.57 393.69 441.56ZM415.24 442.24H403.88V453.91H415.24V442.24Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M453.13 439.29L450.61 436.1C455.09 434.2 459.7 430.82 460.93 425.78H451.9V422.22H461.11V417.43H465.16V421.97H476.21L476.15 423.08C475.97 426.15 475.66 431.25 474.92 433.33C474.12 435.79 472.34 436.58 469.82 436.58C468.16 436.58 466.44 436.46 464.85 436.21L464.18 432.46C465.78 432.77 467.25 432.95 468.72 432.95C469.89 432.95 470.75 432.46 471.18 431.29C471.55 429.82 471.79 427.67 471.92 426.13C471.92 425.88 471.98 425.7 471.98 425.45H464.92C463.81 432.2 459.27 436.5 453.13 439.27V439.29ZM467.31 463.05L471.12 465.57C465.84 469.07 460.19 471.89 453.99 473.49L450.8 469.74C456.69 468.45 462.28 466.36 467.32 463.05H467.31ZM500.41 469.19L496.85 473C491.39 470.11 485.8 467.66 479.9 465.63L483.52 462.99H457.42V438.8H494.45V462.99H483.64C489.41 464.65 494.94 466.92 500.4 469.19H500.41ZM461.73 442.06V445.81H490.22V442.06H461.73ZM461.73 448.93V452.61H490.22V448.93H461.73ZM461.73 455.75V459.68H490.22V455.75H461.73ZM498.75 420.5V436.22H478.79V420.5H498.75ZM482.85 423.94V432.78H494.7V423.94H482.85Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M513.25 460.29L511.29 455.56C515.34 453.66 519.15 451.26 522.89 448.68H522.83V418.78H527.13V472.69H522.83V453.16C519.82 455.74 516.63 458.13 513.25 460.28V460.29ZM512.51 429.78L516.13 427.63C518.4 432.17 520.12 436.72 521.47 441.45L517.72 443.72H517.54C516.37 438.93 514.72 434.2 512.5 429.78H512.51ZM563.54 467.23L560.22 471.65C552.42 464.34 547.69 455.56 545.24 445.37C543.89 456.42 539.22 465.75 530.69 473.18L527.68 469.43C537.14 462 541.13 450.64 542.17 438.97H528.66V434.98H542.35V419.02H546.59V434.98H562.68V438.97H547.27C549.23 450.39 554.33 460.15 563.54 467.21V467.23ZM549.91 423.14L553.29 420.81C555.56 423.7 557.4 426.7 559 429.84L555.38 432.6H555.2C553.79 429.22 552.07 426.03 549.92 423.14H549.91Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M597.19 439.23C601.43 439.11 604.13 441.13 605.42 444.94C608.61 443.59 611.74 442.36 616.17 440.58L617.95 444.57C613.47 446.35 609.66 447.89 606.34 449.36V458.45H601.92V451.08C596.82 453.78 589.58 457.22 591.48 462.44C592.95 466.49 599.83 466.25 602.1 466.25C605.91 466.25 610.14 465.7 613.83 465.27L614.01 469.63C610.02 470.12 606.09 470.61 601.85 470.61C593.75 470.67 589.08 468.58 587.3 464.47C583.55 455.51 594.48 450.41 601.42 446.6C600.5 443.59 598.66 443.22 597.18 443.22H589.44L591.22 429.77H580.54V425.59H591.84L592.82 418.22H597.42L596.38 425.59H611.98V429.77H595.77L594.54 439.23H597.18H597.19Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M680.15 447.27H675.729V444.02H662.34V464.71H678.18V451.02H682.479V472.69H678.18V468.7H642.32V472.69H638.02V451.02H642.32V464.71H657.789V444.02H644.65V447.27H640.289V425.23H644.65V440.03H657.789V419.03H662.33V440.03H675.719V425.23H680.14V447.27H680.15Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M720.25 470.05C713.37 470.05 707.72 465.81 707.72 457.09V421.78H712.57V457.09C712.57 462.13 714.84 465.63 720.06 465.63C724.91 465.63 731.73 462.93 739.34 452.86L742.66 455.87C735.41 465.63 727.68 470.05 720.25 470.05Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M787.06 459.8C786.88 466.55 784.17 469.81 777.67 469.81C771.17 469.81 764.41 465.82 766.68 459.06C767.66 456.24 770.73 454.33 775.15 453.78C777.36 453.47 779.75 453.47 782.58 454.03V443.28H767.41V439.11H782.58V429.84H766.62V425.6H782.58V418.29H787.06V425.6H801.37V429.84H787.06V439.11H800.45V443.28H787.06V455.32C793.26 457.41 797.68 460.48 802.23 463.73L799.53 467.23C793.82 462.99 790.63 461.27 787.07 459.8H787.06ZM775.76 458.45C773.86 458.7 771.52 459.62 771.16 461.34C770.55 463.92 774.48 465.45 777.67 465.45C782.15 465.45 782.64 463.24 782.58 458.82C780.12 458.27 777.36 458.21 775.76 458.45Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M843.06 470.05C836.18 470.05 830.53 465.81 830.53 457.09V421.78H835.38V457.09C835.38 462.13 837.65 465.63 842.87 465.63C847.72 465.63 854.54 462.93 862.15 452.86L865.47 455.87C858.22 465.63 850.49 470.05 843.06 470.05Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M888.02 469.69L883.84 467.54C891.64 453.29 893.91 449.3 894.16 433.71H884.95V429.6H894.16V419.22H898.95V429.6H909.7V433.71H898.89C898.64 450.59 895.82 455.45 888.02 469.69ZM905.33 459.12V456.85H909.93V459.12C909.93 463.79 915.52 464.09 920.86 464.09H926.94V468.45H920.98C912.75 468.45 905.32 467.1 905.32 459.12H905.33ZM925.96 440.77V444.88H907.05V440.77H925.96Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M963.85 419.64H970.73L969.69 456.6H964.9L963.86 419.64H963.85ZM963.85 462.2H970.73V469.32H963.85V462.2Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M891.11 358.89H883.03V355.3H891.16V343.58H895.17V355.3H898.76C902.09 355.3 907.05 355.99 908.95 361.74C909.64 363.85 909.85 366.17 909.85 370.72C909.85 375.27 909.64 377.37 908.95 379.59C907 385.56 902.4 385.98 896.86 385.98V382.23C903.41 382.23 904.25 380.75 905.04 378.22C905.51 376.79 905.78 375.1 905.78 370.72C905.78 366.34 905.52 364.44 905.04 363.01C904.3 360.63 902.87 358.89 898.76 358.89H895.12C894.8 369.87 893.17 372.67 886.73 385.29L883.19 383.55C889.68 370.88 890.9 368.77 891.11 358.89ZM914.55 351.82H911.54V343.85H914.55V351.82ZM912.7 356.89L915.5 354.36C921.68 358.95 922.36 362.33 922.36 374.48H918.45C918.45 362.28 917.45 360.96 912.7 356.9V356.89ZM920.94 351.87H917.93V343.9H920.94V351.87Z"
              fill="black"
              stroke="black"
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              d="M855.07 589.08C856.9 587.75 858.05 585.5 858.05 583.25C858.05 580.67 856.56 578.12 854.25 576.79C852.8 583.1 849.22 588 844.44 590.47C842.43 591.5 840.49 591.72 838.74 590.95C837.73 590.51 836.35 589.51 835.72 587.37C834.79 583.98 836.43 580.44 838.48 578.07C841.02 575.86 841.76 575.41 843.48 574.71V569.66H838.19V567.23H843.52V562.99H846.28V567.23H855.12V569.66H846.28V573.94C847.47 573.72 848.67 573.57 849.82 573.57C850.6 573.57 851.35 573.64 852.06 573.75C852.17 572.79 852.17 571.91 852.17 571.91H854.93C854.89 572.46 854.86 573.39 854.71 574.49C858.48 576.04 860.82 579.32 860.82 583.23C860.82 586.14 859.44 588.98 857.13 590.79C855.23 592.34 852.77 593.08 849.6 593.08H849.53V590.68C851.39 590.57 853.3 590.35 855.09 589.06L855.07 589.08ZM841.27 579.05C839.33 580.82 837.65 584.1 838.32 586.65C838.58 587.68 839.14 588.42 839.85 588.72C840.86 589.16 842.27 588.98 843.5 588.28V577.47C842.64 578.02 841.9 578.5 841.26 579.06L841.27 579.05ZM851.64 576.06C850.11 575.88 848.17 575.88 846.27 576.43V586.2C848.84 583.65 850.82 580 851.64 576.06Z"
              fill="#4D4D4D"
              stroke="#4D4D4D"
              stroke-width="0.25"
              stroke-miterlimit="10"
            />
            <path
              d="M869.94 582.51V565.84H872.62V582.88C872.62 586.13 872.92 586.61 875.01 589.34L872.92 590.93C870.31 587.79 869.94 586.65 869.94 582.52V582.51ZM896.19 571.12V573.48H890.45V579.75C890.45 587.79 890.52 589.19 885.27 593.47L883.26 591.66C887.55 587.79 887.66 587.34 887.66 579.75V573.48H877.7V571.12H887.66V563.71H890.46V571.12H896.2H896.19Z"
              fill="#4D4D4D"
              stroke="#4D4D4D"
              stroke-width="0.25"
              stroke-miterlimit="10"
            />
            <path
              d="M920.46 576.76C923.26 576.76 925.38 577.61 926.91 579.34C929.56 582.36 929.45 587.01 926.61 590.04C924 592.77 919.53 592.66 917.07 592.59V590.12C920.43 590.19 923.11 589.68 924.49 588.2C926.32 586.17 926.47 583.15 924.79 581.15C923.67 579.82 922.03 579.12 919.91 579.12C918.19 579.12 915.36 579.67 913.83 580.67V588.16C913.83 589.82 913.31 591.04 912.3 591.78C911.22 592.55 909.65 592.52 908.46 592.04C906.52 591.3 904.69 589.27 904.66 586.88C904.62 585.33 905.26 583.82 906.45 582.64C907.83 581.35 909.28 580.21 911.11 579.25V571.17H905.44V568.59H911.11V563.76H913.83V568.59H918.98V571.17H913.83V578.22C915.36 577.22 918.6 576.78 920.47 576.78L920.46 576.76ZM907.6 585.72C907.08 587.45 908.12 589.11 909.43 589.59C910.74 590.07 911.11 589.48 911.11 588.23V582.11C909.54 583.11 908.05 584.21 907.61 585.72H907.6ZM920.91 573.59V571.12C926.43 571.12 927.58 571.41 930.49 574.48L928.4 576.21C926.27 574.07 926.01 573.59 920.91 573.59Z"
              fill="#4D4D4D"
              stroke="#4D4D4D"
              stroke-width="0.25"
              stroke-miterlimit="10"
            />
            <path
              d="M957.34 569.23C960.4 570.04 962.75 571.63 964.31 573.95C966.88 577.6 967.18 582.43 965.06 586.16C963.01 589.81 958.91 592.21 954.1 592.62L953.8 590.04C957.68 589.49 960.62 588.31 962.64 584.84C964.28 582.04 964.02 578.31 962.04 575.36C960.85 573.63 958.91 572.26 956.71 571.6C956.08 574.07 955.29 576.51 954.32 579.01C953.57 580.96 952.6 583.25 951.19 585.24C951.67 586.2 952.2 587.05 952.79 587.86L950.48 589.34C950.03 588.71 949.66 588.2 949.29 587.42C947.8 588.93 946.05 589.93 944.07 589.93C940.16 589.93 938.07 585.87 938.59 581.34C938.96 577.84 940.72 574.7 943.51 572.27C943.06 570.32 942.69 568.25 942.39 565.82L945.15 565.3C945.37 567.22 945.67 569.03 946.01 570.8C949.29 568.88 952.27 568.77 954.62 568.77C954.92 567.15 955.29 565.52 955.4 563.46H958.16C957.97 564.9 957.79 567 957.34 569.25V569.23ZM944.25 575.1C942.61 577.02 941.6 579.34 941.34 581.63C941.23 582.44 941.12 585.17 942.53 586.76C943.95 588.24 946.44 586.76 947.97 585.06C946.93 582.99 945.47 579.64 944.24 575.1H944.25ZM949.81 582.59C950.67 580.93 951.34 579.31 951.82 578.02C952.75 575.62 953.39 573.22 953.95 571.09C950.82 571.09 949.36 571.72 946.6 573.16C947.42 576.44 948.5 579.54 949.81 582.6V582.59Z"
              fill="#4D4D4D"
              stroke="#4D4D4D"
              stroke-width="0.25"
              stroke-miterlimit="10"
            />
            <path
              d="M982.28 564.22V580.23H979.48V564.22H982.28ZM984.55 591.22L986.3 593.58C994.39 587.57 996.33 585.28 996.33 573.55V564.22H993.38V573.55C993.38 584.32 991.85 585.69 984.54 591.22H984.55Z"
              fill="#4D4D4D"
              stroke="#4D4D4D"
              stroke-width="0.25"
              stroke-miterlimit="10"
            />
            <path
              d="M1019.86 567.28V570.08H1009.5V567.28H1019.86ZM1010.5 592.03V589.3C1022.06 589.3 1024.26 585.24 1030.82 573.29L1033.47 574.73C1027.06 586.5 1024.19 592.03 1010.5 592.03Z"
              fill="#4D4D4D"
              stroke="#4D4D4D"
              stroke-width="0.25"
              stroke-miterlimit="10"
            />
            <path
              d="M1061.13 571.26H1052.03C1050.46 574.17 1048.26 576.39 1043.38 579.78L1041.66 577.57C1050.65 571.23 1050.68 567.98 1050.68 563H1053.66C1053.66 565.91 1053.47 567.17 1053.1 568.57H1064.1V571.08C1064.1 578.9 1059.03 585.13 1045.68 593.36L1044.04 591.04C1056.31 583.4 1060.97 577.95 1061.12 571.27L1061.13 571.26Z"
              fill="#4D4D4D"
              stroke="#4D4D4D"
              stroke-width="0.25"
              stroke-miterlimit="10"
            />
            <path
              d="M800.61 588.22C799.28 588.22 798.05 587.6 796.92 586.36H796.82L796.48 587.87H793.01V567.9H797.43V572.69L797.33 574.81C798.44 573.8 799.66 573.3 800.99 573.3C802.68 573.3 804.04 573.96 805.06 575.27C806.08 576.58 806.59 578.33 806.59 580.51C806.59 582.87 806 584.75 804.82 586.14C803.64 587.53 802.24 588.23 800.61 588.23V588.22ZM799.56 584.58C800.29 584.58 800.88 584.25 801.33 583.6C801.78 582.95 802 581.95 802 580.6C802 578.14 801.23 576.91 799.71 576.91C798.96 576.91 798.2 577.32 797.44 578.13V583.75C798.06 584.3 798.77 584.58 799.56 584.58Z"
              fill="#4D4D4D"
            />
            <path
              d="M811.21 593.35C810.44 593.35 809.75 593.26 809.11 593.08L809.92 589.71C810.49 589.82 810.81 589.88 810.87 589.88C812.09 589.88 812.88 589.31 813.24 588.17L813.46 587.46L807.99 573.64H812.48L814.36 579.55C814.59 580.28 814.96 581.63 815.48 583.58H815.6C815.7 583.12 816.01 581.78 816.53 579.55L818.17 573.64H822.39L817.51 587.9C816.78 589.82 815.95 591.21 815.02 592.06C814.09 592.91 812.82 593.34 811.21 593.34V593.35Z"
              fill="#4D4D4D"
            />
            <path d="M350 382H133V393H350V382Z" fill="#CC0000" />
            <path
              d="M350 159H315.89C310.84 159 306.75 154.2 306.75 148.27C306.75 142.34 310.84 137.54 315.89 137.54C328.58 137.54 350 137.54 350 137.54V158.99V159Z"
              fill="#E6BE8F"
            />
            <path
              d="M333.45 122.73H292.79C287.383 122.73 283 127.113 283 132.52C283 137.927 287.383 142.31 292.79 142.31H333.45C338.857 142.31 343.24 137.927 343.24 132.52C343.24 127.113 338.857 122.73 333.45 122.73Z"
              fill="#E6BE8F"
            />
            <path
              d="M133 328.18H175.16C180.56 328.18 184.95 332.57 184.95 337.97C184.95 343.37 180.56 347.76 175.16 347.76H133V328.18Z"
              fill="#E6BE8F"
            />
            <path
              d="M199.63 345.44H158.97C153.563 345.44 149.18 349.823 149.18 355.23C149.18 360.637 153.563 365.02 158.97 365.02H199.63C205.037 365.02 209.42 360.637 209.42 355.23C209.42 349.823 205.037 345.44 199.63 345.44Z"
              fill="#E6BE8F"
            />
            <path
              d="M158 209.14V180.22H234V257.35H217.11C210.02 257.35 204.44 263.91 204.44 271.81C204.44 279.71 210.01 286.27 217.11 286.27H234V315.19H158V238.06H174.89C181.81 238.06 187.56 231.7 187.56 223.6C187.56 215.5 181.82 209.33 174.89 209.33L158 209.14Z"
              fill="white"
            />
            <path
              d="M287.06 218.98C287.06 224.19 290.94 228.62 295.7 228.62H322.31V315.39H243V286.47H269.44C276.67 286.47 282.66 279.91 282.66 272.01C282.66 264.11 276.67 257.55 269.44 257.55H243V180.42H322.31V209.34H295.87C290.93 209.34 287.06 213.58 287.06 218.98Z"
              fill="white"
            />
            <path
              d="M177 196C178.657 196 180 194.657 180 193C180 191.343 178.657 190 177 190C175.343 190 174 191.343 174 193C174 194.657 175.343 196 177 196Z"
              fill="#8E2400"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_422_2528"
              x="73.5"
              y="57"
              width="1084.1"
              height="637.1"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="21" dy="16" />
              <feGaussianBlur stdDeviation="7.05" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_422_2528"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_422_2528"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_422_2528">
              <rect width="1200" height="630" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <div
          style={{
            position: 'absolute',
            top: '300px',
            left: '380px',
            width: '480px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontSize: '52px',
              color: 'black',
              textAlign: 'center',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              width: 'auto',
            }}
          >
            {card?.data.attributes.creatorName}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'SmartFont', // フォント名
          data: fontData, // フォントデータ
          style: 'normal',
        },
      ],
    }
  )
}
