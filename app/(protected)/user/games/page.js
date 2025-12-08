"use client";
import EnemyBoard from "@/app/_components/EnemyBoard";
import PlayerBoard from "@/app/_components/PlayerBoard";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/app/_lib/AuthContext";
import { db } from "@/app/_lib/firebase";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { LoadingBar } from "@/app/_components/Loading";

export default function Games() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  async function savePlayerBoard(board) {
    await setDoc(
      doc(db, "games", user.uid),
      {
        playerBoard: board,
      },
      { merge: true }
    );
  }
  async function saveEnemyBoard(board) {
    await setDoc(
      doc(db, "games", user?.uid),
      {
        enemyBoard: board,
      },
      { merge: true }
    );
  }
  const pBoard = useRef(null);
  const eBoard = useRef(null);
  useEffect(() => {
    async function getData() {
      const snapshot = await getDoc(doc(db, "games", user?.uid));
      try {
        const data = snapshot.data();
        if (data != null) {
          pBoard.current = JSON.parse(data.playerBoard);
          eBoard.current = JSON.parse(data.enemyBoard);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [getDoc, setLoading, user]);
  return (
    <div className="flex justify-center flex-wrap">
      {loading ? (
        <LoadingBar />
      ) : (
        <>
          <PlayerBoard
            initialBoard={
              pBoard.current ?? [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              ]
            }
            saveBoard={savePlayerBoard}
          />
          <EnemyBoard
            saveBoard={saveEnemyBoard}
            initialBoard={
              eBoard.current ?? [
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
              ]
            }
          />
        </>
      )}
    </div>
  );
}
