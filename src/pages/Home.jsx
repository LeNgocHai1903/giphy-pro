import { useState, useEffect, useRef, useCallback } from "react";
import Card from "../components/Card/Card";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Modal from "../components/Modal/Modal";

import LazyLoad from "react-lazyload";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [choosenImage, setChoosenImage] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const responseData = await axios(
        "https://api.giphy.com/v1/gifs/trending",
        {
          params: {
            api_key: "jpuElt6vqU7xebedN1FzuJBwL5IoCmdf",
            limit: 20,
            offset: page,
          },
        }
      );
      setData((prev) => [...prev, ...responseData.data.data]);
      setLoading(false);
      setHasMoreData(page < responseData.data.pagination.total_count);
    };
    fetchData();
  }, [page]);

  const openModalHandler = (url) => {
    setChoosenImage(url);
    setOpenModal(!openModal);
  };

  const observer = useRef();
  const lastGifElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreData) {
          setPage((prev) => prev + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreData]
  );

  return (
    <>
      {openModal && (
        <Modal url={choosenImage} toogle={() => setOpenModal(!openModal)} />
      )}
      <div className="flex justify-center">
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
          {data.map((d, i) => {
            if (data.length === i + 1) {
              return (
                <LazyLoad
                  key={i}
                  offset={100}
                  placeholder={
                    <div className="h-20 flex justify-center">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <Card
                    gifsRef={lastGifElementRef}
                    key={i}
                    giphy={d.images.fixed_height}
                    userAvatar={d.user?.avatar_url}
                    userName={d.user?.display_name}
                    userLink={d.user?.profile_url}
                    openModal={() =>
                      openModalHandler(d.images.fixed_height.url)
                    }
                  />
                </LazyLoad>
              );
            } else {
              return (
                <LazyLoad
                  key={i}
                  offset={100}
                  placeholder={
                    <div className="h-20 flex justify-center">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <Card
                    key={i}
                    giphy={d.images.fixed_height}
                    userAvatar={d.user?.avatar_url}
                    userName={d.user?.display_name}
                    userLink={d.user?.profile_url}
                    openModal={() =>
                      openModalHandler(d.images.fixed_height.url)
                    }
                  />
                </LazyLoad>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
