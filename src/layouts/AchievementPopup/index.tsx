import { countReceivedRecords } from '../../utils/strapi/receivedCard'
import {
  addAchievement,
  getUserAchievmetns,
} from '../../utils/strapi/achievement'
import Popup from './Popup'

const receivedRecordAchievements = [
  {
    threshold: 10,
    achievementKey: 'RECEIVED_RECORDS_10',
  },
  {
    threshold: 50,
    achievementKey: 'RECEIVED_RECORDS_50',
  },
  {
    threshold: 100,
    achievementKey: 'RECEIVED_RECORDS_100',
  },
  {
    threshold: 500,
    achievementKey: 'RECEIVED_RECORDS_500',
  },
  {
    threshold: 1000,
    achievementKey: 'RECEIVED_RECORDS_1000',
  },
]

const AchievementPopup = async () => {
  const receivedRecordCount = await countReceivedRecords()
  const achievements = await getUserAchievmetns()
  if (!receivedRecordCount || !achievements) return null

  const newAchievements = receivedRecordAchievements.filter(
    (achievement) =>
      receivedRecordCount >= achievement.threshold &&
      !achievements.data.find(
        (achievementRecord) =>
          achievementRecord.attributes.achievementKey ===
          achievement.achievementKey
      )
  )
  if (!newAchievements.length) return null
  newAchievements.forEach((achievement) => {
    addAchievement(achievement.achievementKey)
  })

  const topAchievement = newAchievements.reduce((prev, current) =>
    prev.threshold > current.threshold ? prev : current
  )
  if (!topAchievement) return null

  return (
    <Popup
      text={
        <>
          おめでとうございます！
          <br />
          {topAchievement.threshold}人が年賀状を
          <br />
          受け取りました！
        </>
      }
    />
  )
}

export default AchievementPopup
