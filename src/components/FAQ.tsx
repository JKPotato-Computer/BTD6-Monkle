import React, { useState } from "react";
import "../css/FAQ.css";

interface AccordionItemProps {
  question: string;
  children: React.ReactNode;
  eventKey: string;
  openKeys: Set<string>;
  setOpenKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  children,
  eventKey,
  openKeys,
  setOpenKeys,
}) => {
  const isOpen = openKeys.has(eventKey);

  const handleToggle = () => {
    const newOpenKeys = new Set(openKeys);
    if (isOpen) {
      newOpenKeys.delete(eventKey);
    } else {
      newOpenKeys.add(eventKey);
    }
    setOpenKeys(newOpenKeys);
  };

  return (
    <div className="faqBox container blue card mb-2">
      <div className="card-header" id={`heading${eventKey}`}>
        <h2 className="mb-0">
          <button
            className={`faqQuestion btn-block text-left ${
              isOpen ? "" : "collapsed"
            }`}
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls={`collapse${eventKey}`}
          >
            {question}
            <img
              src="assets/ui/ExpandButton.webp"
              className={isOpen ? "accordion-btn-open" : "accordion-btn-close"}
            />
          </button>
        </h2>
      </div>

      <div
        id={`collapse${eventKey}`}
        className={`collapse ${isOpen ? "show" : ""}`}
        aria-labelledby={`heading${eventKey}`}
      >
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

const MultiOpenFAQAccordion: React.FC = () => {
  // Explicitly define the type of the Set when initializing useState
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  return (
    <div className="accordion" id="faqAccordion">
      <AccordionItem
        question="How did you determine the crosspaths?"
        eventKey="1"
        openKeys={openKeys}
        setOpenKeys={setOpenKeys}
      >
        <p>Short answer: GPT.</p>
        <p>
          Long answer: Well, it's a bit deeper than that. Consider the number of
          combinations there are for crosspaths on a single monkey (excluding
          paragons) - there are <b>64</b> combinations per monkey. As of writing
          this, there are currently <b>25</b> monkeys, so in total... there are{" "}
          <b>1600</b> total possible combinations in the entirety of BTD6... and
          there's only one me. I can't go through all 1600 combinations myself
          (making the site actually work was alot harder than I expected), so
          onward to asking GPT for help. Except, it kind of sucks.
        </p>
        <p>
          The way I determined the information was by giving GPT the description
          of every upgrade for one specific tower sourced by inputting a whole
          bunch of Fandom websites. Second, I create a JSON crosspath upgrade
          list based off the information provided, along with downloading the
          respective images for each upgrade. (but not the monkeys... can't be
          bothered to. Lastly, it would attempt to "mix and match" every
          crosspath until it reached all 64 total combinations. Is it the most
          accurate? Not really.
        </p>
        <p>In fact - here's the code detailing exactly how I did that:</p>
        <pre>
          <code>
            // TBD - i haven't actually made this yet. this is kind of the plan
            for it - i know that the current implementation/data is basically
            wrong, just making sure the site itself works ;)
          </code>
        </pre>
        <p>
          However, AI is not the most reliable - and I can't be bothered to
          verify 1600 different crosspaths. So, if you notice anything wrong -
          maybe{" "}
          <a
            href="https://github.com/JKPotato-Computer/BTD6-Monkle"
            target="_blank"
          >
            send a pull request with your edits on GitHub
          </a>{" "}
          or simply{" "}
          <a href="#" target="_blank">
            submit a form (unavaliable)
          </a>{" "}
          with the corrections.
        </p>
      </AccordionItem>

      <AccordionItem
        question="What exactly distinguishes each crosspath?"
        eventKey="2"
        openKeys={openKeys}
        setOpenKeys={setOpenKeys}
      >
        <p>
          The "letters" that determine whether or not the tower & upgrades are
          correct is based on 7 factors: (along with their respective colors)
        </p>
        <ul>
          <li>
            Class / Category: Pretty straightforward - what category does the
            tower belong to? There's only two options here, really: 🟩 if its
            correct, 🟥 if its incorrect.
          </li>
          <li>
            Attack Speed, Damage, Pierce, Range, Attack Type: What is special
            about these towers is that they can have multiple projectiles - some
            are from the main attack itself, some are passive, some deal damage
            over time, some deal damage with abilities, and so on. There isn't
            really a great way to describe every projectile under one
            standardized way - so instead, it's going to be split by projectiles
            - and some will be left out. Here's how it works exactly:
            <ul>
              <li>
                In BTD6 Monkle, only <b>main</b> projectiles that directly come
                from the monkey or within the range of the monkey are
                considered. For instance, a 2-3-0 Druid would have two
                projectiles: the Lightning attack from 2-x-x, and the main
                projectile from 0-0-0 base tower - the 0-3-0 vine effect will be
                disregarded. (but it will still be recognized as a keyword,
                check that section out too) and only the{" "}
                <b>amount of damage upon contact</b> is considered - there is no
                DPS, crits, whatever.
              </li>
              <li>
                If a monkey throws multiple projectiles of the same kind at once
                (for instance Triple Darts on a Dart Monkey),{" "}
                <b>only ONE projectile is considered.</b> Technically, it has 3
                damage and 6 pierce since it throws three darts, but BTD6 Monkle
                will only consider it as 1 damage and 2 pierce.
              </li>
              <li>
                If there is <b>only one projectile</b>, it will display on its
                own, and you will get hints on whether or not there is more OR
                less of that category. 🟩 if it is exactly correct, 🟨 if it's
                within 20% of the correct answer, and 🟥 if it's wrong. (note
                that yellow only applies to Range and Attack Speed)
              </li>
              <li>
                If there are <b>more than one unique projectiles</b>, it will
                display itself as a list of projectiles. From here, you only
                really get two options: 🟩 if it's correct, 🟥 if it's... not.
              </li>
              <li>
                <i>
                  PS: I am aware that the Druid in this version is wrong, and by
                  these definitions will still be wrong... I can't do much about
                  it unless if you can suggest me better ideas. Sorry... :(
                </i>
              </li>
            </ul>
          </li>
          <li>
            Attack Speed: How fast the tower attacks (in short, the cooldown
            between each attack). Refer to the description above on how these
            are displayed.
          </li>
          <li>
            Damage: How much damage the tower does per attack. Refer to the
            description above on how these are displayed.
          </li>
          <li>
            Pierce: How many bloons the tower can hit per attack. Refer to the
            description above on how these are displayed.
          </li>
          <li>
            Range: How far the tower can attack in some form of unit. Refer to
            the description above on how these are displayed.
          </li>
          <li>
            Attack Type: What type of attack the tower has. This is a bit more
            complicated, but here's how it works:
            <ul>
              <li>
                BTD6 Wordle recognizes these terms as attack types: Sharp,
                Explosion, Cold, Energy, Plasma, and Normal. See{" "}
                <a
                  href="https://www.reddit.com/r/btd6/comments/pbsklr/quick_and_easy_guide_to_damage_types_and/"
                  target="_blank"
                >
                  this post that I used as a reference.
                </a>
              </li>
              <li>
                Each projectile (ideally) should correspond to <b>ONE</b> term.
              </li>
            </ul>
          </li>
          <li>
            Keywords: In order to differentiate from each crosspath upgrade,
            there are a total of <b>12 possible keywords</b> that each upgrade
            can be standardized into (if it even needs it at all). You won't
            know what they are (unless if you click Reveal), but you will know
            if you need to be more or less specific. 🟩 if all the keywords
            match, 🟨 if you are 1 keyword away from the correct answer, and 🟥
            if it's too large / small or the keywords don't match. Here's a list
            of each of them in a neat table format ;)
            <br />
            <span className="fs-6">
              <i>
                PS: Just realized half of these are wrong - give me some time to
                fix them :sob:
              </i>
            </span>
            <table>
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Definition</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>damageBonus</td>
                  <td>
                    Deals bonus damage to specific bloon types (e.g. ceramics,
                    MOABs)
                  </td>
                  <td>
                    Dart Monkey 4-0-0 (Juggernaut), Sniper Monkey 3-0-0 (Deadly
                    Precision)
                  </td>
                </tr>
                <tr>
                  <td>bloonDebuff</td>
                  <td>
                    Applies negative effects to bloons (slow, strip, burn, etc.)
                  </td>
                  <td>
                    Ice Monkey 0-2-0 (Permafrost), Wizard Monkey 0-3-0 (Wall of
                    Fire)
                  </td>
                </tr>
                <tr>
                  <td>towerBuff</td>
                  <td>
                    Passively buffs nearby towers (speed, range, damage, etc.)
                  </td>
                  <td>
                    Village 0-2-0 (Jungle Drums), Alchemist 3-0-0 (Berserker
                    Brew)
                  </td>
                </tr>
                <tr>
                  <td>scaling</td>
                  <td>
                    Gets stronger based on game state (rounds, lives
                    lost/gained, etc.)
                  </td>
                  <td>
                    Druid 0-0-2 (Heart of Vengeance), Druid 0-2-0 (Heart of Oak)
                  </td>
                </tr>
                <tr>
                  <td>synergy</td>
                  <td>
                    Gains power from other towers of the same type or specific
                    classes
                  </td>
                  <td>Druid 0-0-4 (Poplust), Sub 0-3-0 (Sub Commander)</td>
                </tr>
                <tr>
                  <td>stackingBuff</td>
                  <td>
                    Buffs or effects that increase in strength when applied
                    repeatedly
                  </td>
                  <td>
                    Druid 0-0-4 (Poplust), Alchemist 4-0-0 (Permanent Brew)
                  </td>
                </tr>
                <tr>
                  <td>terrainEffect</td>
                  <td>Leaves persistent effects or hazards on the track</td>
                  <td>
                    Druid 5-0-0 (Superstorm), Wizard 0-0-5 (Prince of Darkness)
                  </td>
                </tr>
                <tr>
                  <td>entangle</td>
                  <td>
                    Stops or traps bloons temporarily (without instantly popping
                    them)
                  </td>
                  <td>
                    Druid 0-3-0 (Druid of the Jungle), Glue Gunner 3-0-0 (MOAB
                    Glue)
                  </td>
                </tr>
                <tr>
                  <td>moneyOnUse</td>
                  <td>
                    Generates money upon activation or as a byproduct of an
                    action
                  </td>
                  <td>
                    Druid 0-4-0 (Jungle’s Bounty), Buccaneer 0-4-0 (Favored
                    Trades)
                  </td>
                </tr>
                <tr>
                  <td>camoSupport</td>
                  <td>Grants camo detection to nearby towers</td>
                  <td>
                    Village 0-2-0 (Radar Scanner), Sub 1-1-0 (Submerge Support)
                  </td>
                </tr>
                <tr>
                  <td>passiveVision</td>
                  <td>
                    Can attack bloons outside of visible range (through shared
                    targeting etc.)
                  </td>
                  <td>
                    Sub 0-0-1 (Advanced Intel), Sniper Monkey 0-0-0 (Global
                    Targeting)
                  </td>
                </tr>
                <tr>
                  <td>areaSupport</td>
                  <td>Provides an aura that affects towers in a radius</td>
                  <td>
                    Village 0-2-0 (Jungle Drums), Ice Monkey 4-0-0 (Super
                    Brittle)
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
        <p>
          There's also two hints that you could use to narrow down even further,
          but they're pretty obvious so... try to challenge yourself!
        </p>
        <ul>
          <li>Reveal Keywords</li>
          <li>Can See Camo</li>
          <li>Has An Ability (referring to special abilities)</li>
        </ul>
      </AccordionItem>
    </div>
  );
};

export default MultiOpenFAQAccordion;
