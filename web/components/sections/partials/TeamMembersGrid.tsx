'use client'

import RenderImage from '@/components/ui/RenderImage'
import RichText, {type RichTextPropValue} from '@/components/ui/RichText'
import {NestedImageField} from '@/lib/images/types'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {getImgSize} from '@/lib/utils/common/get-image-size'
import {TeamMemberSchema} from '@/lib/zod/sections/content/team-overview'
import {SanityColor} from '@/lib/types/color-format'
import classNames from 'classnames'
import {memo, useCallback, useState} from 'react'

type TeamMembersProps = {
  members: TeamMemberSchema[]
}

function TeamMembersGrid({members}: TeamMembersProps) {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const openBlock = useCallback((index: number) => {
    setOpenItem((prev) => (prev === index ? null : index))
  }, [])

  return (
    <div className="lyraTeamOverview-cards">
      {members.map((member, index) => {
        const img = member.image as NestedImageField | null | undefined
        const imgAlt = img?.alt ?? (member.name || 'Team Member Image')
        const imgSize = getImgSize(img?.widthSize || 'normal', 140)
        const hasBio = member.bio && member.bio.length > 0

        const bioTextClass = classNames('lyraTeamOverview-card-bio-preview', {
          open: openItem === index,
        })

        const memberCss = getCssVars(
          {
            textColor: member.textColor as SanityColor,
            bgColor: member.background as SanityColor,
          },
          'teamMember',
        )

        return (
          <div key={member.id || index} className="lyraTeamOverview-card" style={memberCss.vars}>
            <div className="lyraTeamOverview-card-image">
              <RenderImage image={img} alt={imgAlt} displayWidth={imgSize} mobileWidth={imgSize} />
            </div>

            <div className="lyraTeamOverview-card-name">{member.name}</div>

            {member.position && (
              <div className="lyraTeamOverview-card-position">{member.position}</div>
            )}

            {hasBio && (
              <>
                <div className={bioTextClass}>
                  <RichText
                    className="lyraTeamOverview-card-bio"
                    value={member.bio as RichTextPropValue}
                  />
                </div>

                <button
                  className="lyraButton lyraTeamOverview-button"
                  onClick={() => openBlock(index)}
                >
                  <span>{openItem === index ? 'Close Bio' : 'Read Bio'}</span>
                </button>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default memo(TeamMembersGrid)
