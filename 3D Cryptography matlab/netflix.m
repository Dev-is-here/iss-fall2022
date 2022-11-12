clc;
clear all;
close all;
batman = imread('C:\Users\karan\Desktop\batman.png');
batman = im2bw(batman, 0.5);
punisher = imread('C:\Users\karan\Desktop\punisher.png');
punisher = im2bw(punisher,0.5);
z1=batman*10+punisher;

%part 1
k=1;
m=1;
for i=1:15
  
    for j=1:15
        x1(i,j,k)=z1(i,j);
    end;
k=k+1;
end;








for i=1:15
    for j=1:15
        for k=1:15           
          
            b(m)=x1(i,j,k);
            m=m+1;
        end;
    end;
end;

% %generate key
a = randperm(3375,3375);

%generate address key matrix
m=1;
for i=1:15
    for j=1:15
        for k=1:15           
            x(i,j,k)=a(m);
           
            m=m+1;
        end;
    end;
end;

%encryption
for i=1:15
    for j=1:15
        for k=1:15
            %storing address encryption key in m
            m=x(i,j,k);
           
            encmtrx(i,j,k)=b(m);
           
        end;
    end;
end;



%decryption
for i=1:15
    for j=1:15
        for k=1:15           
            m=x(i,j,k);
            c(m)=encmtrx(i,j,k);
           
        end;
    end;
end;

%resultant array c must match original string b
%putting resultant array in cube
%resultant cube ogmtrx must match x1 original matrix
m=1;
for i=1:15
    for j=1:15
        for k=1:15           
            ogmtrx(i,j,k)=c(m);
            m=m+1;
        end;
    end;
end;


%convert ogmtrx into image file
k=1;
m=1;
for i=1:15
  
    for j=1:15
        netflix(i,j)=ogmtrx(i,j,k);
    end;
k=k+1;
end;


%split image
batman2= netflix/10;
batman2 = im2bw(batman2,0.5);
%imshow(batman2);

punisher2=mod(netflix,10);
puunisher2=im2bw(punisher2,0.5);
%imshow(punisher2);

