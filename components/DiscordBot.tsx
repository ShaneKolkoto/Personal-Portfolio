"use client";

import React from "react";
import styles from "./styles.module.css"; // Import CSS file for styling
import Image from "next/image";
import Link from "next/link";

const DiscordBot = () => {
  return (
    <div className={`${styles.discordBot} animate-bounce hover:animate-none`}>
      <Link
        href="https://discord.com/invite/HK3UjfMJ"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className={styles.discordBotIcon}>
          <Image
            src="/discord-icon.png"
            height={100}
            width={100}
            className=""
            alt="chat-icon"
          />
        </div>
      </Link>
    </div>
  );
};

export default DiscordBot;
