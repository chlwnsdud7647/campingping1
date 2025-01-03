'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ModalBox from '@/components/ModalBox/ModalBox';
import WriteModal from './WriteModal';
import PostDetailModal from './PostDetailModal';
import Nav from '@/components/Nav/Nav';
import chevron from '@icons/chevron_green.svg';
import write from '@icons/write.svg';
import search from '@icons/nav/search_gray.png';
import logo1 from '@images/campingping_orange.svg';
import { getPosts, getMyPosts } from '@utils/communitiesService';

interface Post {
  data: any;
  id?: string;
  title: string;
  location: string;
  people: number;
  content: string;
  startDate: Date;
  endDate: Date;
  lat: number;
  lon: number;
}

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<'myPosts' | 'allPosts'>('myPosts');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [myPosts, setMyPosts] = useState<Post[]>([]);

  const handleTabChange = async (tab: 'myPosts' | 'allPosts') => {
    setActiveTab(tab);

    if (tab === 'myPosts') {
      const data = await getMyPosts();
      if (data) {
        const postsWithDates = data.map((post: any) => ({
          ...post,
          startDate: new Date(post.startDate),
          endDate: new Date(post.endDate),
        }));
        setMyPosts(postsWithDates);
      }
    } else if (tab === 'allPosts') {
      const data = await getPosts();
      if (data) {
        const postsWithDates = data.map((post: any) => ({
          ...post,
          startDate: new Date(post.startDate),
          endDate: new Date(post.endDate),
        }));
        setMyPosts(postsWithDates);
      }
    }
  };

  const openWriteModal = () => setIsWriteModalOpen(true);
  const closeWriteModal = () => setIsWriteModalOpen(false);

  const openDetailModal = (post: Post) => {
    setSelectedPost(post);
    setIsDetailModalOpen(true);
  };
  const closeDetailModal = () => {
    setSelectedPost(null);
    setIsDetailModalOpen(false);
  };

  const addNewPost = (newPost: Post) => {
    setMyPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const data = await getMyPosts(); // 초기에는 내 게시물로 설정
      if (data) {
        const postsWithDates = data.map((post: any) => ({
          ...post,
          startDate: new Date(post.startDate),
          endDate: new Date(post.endDate),
        }));
        setMyPosts(postsWithDates);
      }
    };

    fetchInitialPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-y-auto w-full">
      <div className="flex justify-center mt-4 gap-1">
        <Image src={logo1} alt="로고 이미지" width={100} height={100} />
      </div>

      <div className="flex justify-center border-b border-gray-200">
        <button
          className={`flex-1 p-3 ${
            activeTab === 'myPosts'
              ? 'border-b-2 border-Green text-Green'
              : 'text-Gray'
          }`}
          onClick={() => handleTabChange('myPosts')}
        >
          내 게시물
        </button>
        <button
          className={`flex-1 p-3 ${
            activeTab === 'allPosts'
              ? 'border-b-2 border-Green text-Green'
              : 'text-Gray'
          }`}
          onClick={() => handleTabChange('allPosts')}
        >
          전체 게시물
        </button>
      </div>

      <div
        className={`min-h-[calc(100vh-4rem)] ${
          myPosts.length === 0 ? 'flex items-center justify-center' : ''
        }`}
      >
        {activeTab === 'myPosts' ? (
          myPosts.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {myPosts.map((post, index) => (
                <div
                  key={index}
                  className="mt-6 ml-6 mr-6 mb-2 bg-white rounded-lg border border-Green cursor-pointer"
                  onClick={() => openDetailModal(post)}
                >
                  <p className="ml-2 mt-2">{post.data.title}</p>
                  <hr className="my-2 border-t-1 border-Green" />
                  <p className="ml-2 mt-1">
                    {new Date(post.data.startDate).toLocaleDateString()}
                    부터
                  </p>

                  <p className="ml-2 mt-1">
                    {new Date(post.data.endDate).toLocaleDateString()}
                    까지
                  </p>

                  <p className="ml-2 mt-1">{post.data.location}</p>
                  <p className="ml-2 mt-1">{post.data.people}</p>
                  <p className="ml-2 mt-1">{post.data.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 text-Gray">
              <Image src={search} alt="검색 아이콘" width={40} height={40} />
              <p>작성된 게시물이 없습니다.</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center space-y-4 text-Gray">
            <Image src={search} alt="검색 아이콘" width={40} height={40} />
            <p>주변에 게시글을 작성한 사람이 없습니다.</p>
          </div>
        )}
      </div>

      <button
        className="fixed bottom-12 right-7 bg-white p-3 rounded-full shadow-lg"
        onClick={scrollToTop}
      >
        <Image src={chevron} alt="페이지 상단으로" width={22} height={22} />
      </button>
      <button
        className="fixed bottom-36 right-7 bg-white p-3 rounded-full shadow-lg"
        onClick={openWriteModal}
      >
        <Image src={write} alt="게시글 작성" width={22} height={22} />
      </button>

      <Nav />

      {isWriteModalOpen && (
        <ModalBox>
          <WriteModal onClose={closeWriteModal} onPostSubmit={addNewPost} />
        </ModalBox>
      )}
      {isDetailModalOpen && selectedPost && (
        <ModalBox>
          <PostDetailModal post={selectedPost} onClose={closeDetailModal} />
        </ModalBox>
      )}
    </div>
  );
};

export default CommunityPage;
