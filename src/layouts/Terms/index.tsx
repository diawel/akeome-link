import { beginningOfSentence, termsOfService, endSentence } from './TermsOfServiceText'

const Terms = async () => {
  return (
    <div>
      <p>{beginningOfSentence}</p>
      {termsOfService.map((section, index) => (
        <div key={index}>
          <p>{section.article}</p>
          <div>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {section.content.map((item, idx) => {
                if (item.type === "default") {
                  return <p key={idx}>{item.text}</p>;
                } else if (item.type === "li") {
                  const nextItem = section.content[idx + 1];
                  return (
                    <li key={idx} className="custom-li">
                      {item.text}
                      {nextItem?.type === "ul" && (
                        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
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
      <p>{endSentence}</p>
    </div>
  )
}

export default Terms