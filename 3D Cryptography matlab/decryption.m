%decrption
clc;
clear all;
close all;
%import images and ds
image1= imread('C:\Users\kunal\Desktop\Image\Image1.png');
encmtrx(:,:,1:3)= image1;
image1= imread('C:\Users\kunal\Desktop\Image\Image2.png');
encmtrx(:,:,4:6)= image1;
image1= imread('C:\Users\kunal\Desktop\Image\Image3.png');
encmtrx(:,:,7:9)= image1;
image1= imread('C:\Users\kunal\Desktop\Image\Image4.png');
encmtrx(:,:,10:12)= image1;
image1= imread('C:\Users\kunal\Desktop\Image\Image5.png');
encmtrx(:,:,13:15)= image1;
a=load('C:\Users\kunal\Desktop\Image\ds.txt','a','-ascii');






%generate address ds matrix
m=1;
for i=1:15
    for j=1:15
        for k=1:15           
            x(i,j,k)=a(m);
           
            m=m+1;
        end
    end
end

%decryption
for i=1:15
    for j=1:15
        for k=1:15           
            m=x(i,j,k);
            c(m)=encmtrx(i,j,k);
           
        end
    end
end

%resultant array c must match original string b
%putting resultant array in cube
%resultant cube ogmtrx must match x1 original matrix
m=1;
for i=1:15
    for j=1:15
        for k=1:15           
            ogmtrx(i,j,k)=c(m);
            m=m+1;
        end
    end
end


%convert ogmtrx into image file
k=1;
m=1;
for i=1:15
  
    for j=1:15
        netflix(i,j)=ogmtrx(i,j,k);
    end
k=k+1;
end

%imshow(netflix);

%split image
batman2= netflix/10;
batman2 = im2bw(batman2,0.5);
%imshow(batman2);

punisher2=mod(netflix,10);
punisher2=im2bw(punisher2,0.5);
%imshow(punisher2);
