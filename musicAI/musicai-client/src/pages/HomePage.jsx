import React, { useState } from "react";
import style from "./homepage.module.css";
import logo from "../assets/images/homePage/choriaLogo.png";
import { AiOutlineFileSearch } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import Button from "../components/common/Button";
import { BiSend } from "react-icons/bi";
import { Form } from "antd";
import { FiPaperclip } from "react-icons/fi";
function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  const musicStyles = [
    "Traditional folk song, crisp tones",
    "French hip-hop beat, emotional",
    "Electronic dance music, female vocals",
    "Classic rock anthem",
  ];

  const handleGenerate = () => {
    console.log("Generating music with:", {
      prompt,
      model: selectedModel,
      style: selectedStyle,
    });
    // Here you would typically call your API to generate music
  };

  return (
    <div className={style.mainPage}>
      <div className={style.notice}>
        <div>
          If you would like to test the AI music generation feature, please
          reach out to us at{" "}
          <span style={{ color: "rgb(255, 199, 1)" }}>
            {" "}
            &nbsp;
            <a href="mailto:dev@choira.io" style={{ color: "inherit" }}>
              dev@choira.io
            </a>
          </span>
        </div>
      </div>

      <nav className={style.nav}>
        <div className={style.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={style.navActions}>
          <AiOutlineFileSearch />
          <CiSettings />

          <Button
            name={"Sign up"}
            icon={<CiUser />}
            style={{
              backgroundColor: "white",
              color: "black",
              cursor: "pointer",
            }}
          />
          <Button
            name={"Sign in"}
            style={{
              color: "white",
              cursor: "pointer",
              border: "2px solid #333333",
            }}
          />
        </div>
      </nav>
      <div className={style.mainContainer}>
        <main className={style.mainContent}>
          <header className={style.header}>
            <h1>Welcome to OASIS</h1>
            <p>
              Our AI music generator is based on artistic intelligence and will
              help you to create amazing and the most unique music track very
              easily from your text description.
            </p>
          </header>
          <div className={style.mainInputDiv}>
            <div className={style.promptDiv} style={{ position: "relative" }}>
              <textarea
                name="prompt"
                id=""
                placeholder="Give a prompt to create music"
              ></textarea>
              <span>
                <BiSend />
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "13px",
                  position: "absolute",
                  bottom: "0%",
                  left: "3%",
                }}
              >
                <input
                  type="file"
                  name="file"
                  id="file"
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="file"
                  style={{
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "#F5F5F5",
                    padding: "7px",
                    border: "2px solid #444444",
                    borderRadius: "10px",
                    background: "#262727",
                    height: "fit-content",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FiPaperclip />
                </label>
                <Form.Item
                  className="formLabel"
                  name="method"
                  // label="Generation"
                >
                  <select
                    name="method"
                    id="method"
                    style={{
                      // width: "fit-content",
                      borderRadius: "10px",
                      outline: "none",
                      padding: "5px",
                      background: "#262727",
                      color: "#F5F5F5",
                    }}
                  >
                    <option value="completeSong">Complete Song</option>
                    <option value="backgroundMusic">Background Music</option>
                  </select>
                </Form.Item>
              </div>
              <Form.Item
                className="formLabel"
                name="method"
                style={{ position: "absolute", bottom: "0%", right: "10%" }}
                // label="Generation"
              >
                <select
                  name="method"
                  id="method"
                  style={{
                    // width: "fit-content",
                    borderRadius: "10px",
                    outline: "none",
                    padding: "5px",
                    background: "#262727",
                    color: "#F5F5F5",
                    border: "none",
                  }}
                >
                  <option value="">Select Model</option>
                  <option value="completeSong">Complete Song</option>
                  <option value="backgroundMusic">Background Music</option>
                </select>
              </Form.Item>

              <div className={style.generateTypeBtn}>
                <div>Prompt</div>
                <div>Custom</div>

              </div>
            </div>

            <div className={style.anotherOptionDiv}>
              {musicStyles.map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
