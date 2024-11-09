import * as styles from './index.css'
import { beginningOfSentence, termsOfService, endSentence } from './TermsOfServiceText'

const Terms = () => {
  return (
    <div className={styles.card}>
      <p className={styles.centeredText}>利用規約</p>
      <p className={styles.beginningText}>{beginningOfSentence}</p>
      {termsOfService.map((section, index) => (
        <div key={index}>
          <p className={styles.articleTitle}>{section.article}</p>
          <div>
            <ul className={styles.ulItem}>
              {section.content.map((item, idx) => {
                if (item.type === "default") {
                  return <p key={idx}>{item.text}</p>;
                } else if (item.type === "li") {
                  const nextItem = section.content[idx + 1];
                  return (
                    <li key={idx} className={styles.listItem}>
                      {item.text}
                      {nextItem?.type === "ul" && (
                        <ul className={styles.ulItem}>
                          {section.content
                            .slice(idx + 1)
                            .filter((nestedItem) => nestedItem.type === "ul")
                            .map((nestedItem, nestedIdx) => (
                              <li key={`${idx}-${nestedIdx}`} className="custom-li">
                                {nestedItem.text}
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      ))}
      <p className={styles.endSentenceText}>{endSentence}</p>
    </div>
  )
}

export default Terms

